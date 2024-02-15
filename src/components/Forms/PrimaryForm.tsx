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

const PrimaryForm = ({ children, onSubmit, style }: TFormProps) => {


  const methods = useForm({
    defaultValues: {
      name:"EPICAC",
      price:100,
      quantity:100,
      monitor:"LCD",
      category:"Core i",
      ram:"200 Gb",
      graphicsCard:"300tb",
      hardDrive:"300tb",
      condition:"New",
      color:"black"

  }});
  return (
    <FormProvider {...methods}>
      <form style={style} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default PrimaryForm;
