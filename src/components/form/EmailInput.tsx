import { FieldError, UseFormRegister } from "react-hook-form";
import TextInput from "./TextInput";

export default function EmailInput({ errors, registerFunc }: { errors: FieldError | undefined, registerFunc: UseFormRegister<any> }) {
    return <TextInput placeholder="Enter your email address" label="email" errors={errors} registerFunc={registerFunc}/>
}