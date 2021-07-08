import bcrypt from "bcrypt"
import validator from "validator"
import { Schema, Document, model, Model } from "mongoose"

interface IUserDocument extends Document {
	password: string

	email: string
	name: string
	created: Date
}

export interface IUser extends IUserDocument {
	comparePassword(password: string): Promise<boolean>
}

const userSchema = new Schema<IUser>(
	{
		password: { type: String, required: true },

		email: { type: String, required: true, trim: true, validate: [validator.isEmail, "wrong email syntax"] },
		name: { type: String, required: true },
		created: { type: Date, default: Date.now }
	},
	{ strict: true }
).index({ email: 1 }, { unique: true })

userSchema.pre<IUserDocument>("save", function (next): void {
	if (this.isModified("password")) {
		bcrypt.genSalt(10, (err, salt) => {
			/* istanbul ignore next */
			if (err) return next(err)
			bcrypt.hash(this.password, salt, (err, hash) => {
				/* istanbul ignore next */
				if (err) return next(err)
				this.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

userSchema.set("toJSON", {
	transform: function (_: any, ret: any, __: any) {
		ret.created = ret.created.getTime()

		delete ret.__v
		delete ret._id
		delete ret.password
	}
})

userSchema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
	const { password } = this
	return new Promise(function (resolve, reject) {
		bcrypt.compare(candidatePassword, password, function (err, isMatch) {
			/* istanbul ignore next */
			if (err) return reject(err)
			return resolve(isMatch)
		})
	})
}

export type IUserModel = Model<IUser>

export const User: IUserModel = model<IUser, IUserModel>("User", userSchema)

export default User
