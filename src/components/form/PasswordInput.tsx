import { FieldError, UseFormRegister } from "react-hook-form";
import TextInput from "./TextInput";

export default function PasswordInput({ errors, registerFunc }: { errors: FieldError | undefined, registerFunc: UseFormRegister<any> }) {
  return <TextInput placeholder="Enter your password" label="password" errors={errors} registerFunc={registerFunc}/>
}