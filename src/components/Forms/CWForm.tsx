import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormProps = {
  children: ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
  style?: any;
};

export const CWForm = ({ children, onSubmit, style }: TFormProps) => {

  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form style={style} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default CWForm;
