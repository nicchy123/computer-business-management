import { Form } from "antd";
import { ReactNode } from "react";
import {
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormProps = {
  children: ReactNode;
  onSubmit: SubmitHandler<any>;
  style?: any;
};

export const CWForm = ({ children, onSubmit, style }: TFormProps) => {
  const methods = useForm();
  
  return (
    <FormProvider {...methods}>
      <Form style={style} onFinish={methods.handleSubmit(onSubmit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default CWForm;

