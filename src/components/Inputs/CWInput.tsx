import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
    name: string;
    label?: string;
    placeholder: string;
    type: string;
    labelColor?: string
}


const CWInput = ({ name, type, label, placeholder, labelColor }:TInputProps) => {
  return (
    <div style={{ color:"white", width:"100%"}}>
        <label style={{marginBottom:"20px", marginLeft:"3px", color:`${labelColor}`}}>{label}</label>
      <Controller
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <Form.Item>
            <Input
            {...field}
            type={type}
            placeholder={placeholder}
            allowClear
            width={"800px"}
            style={{padding:"10px" , marginTop:"2px", width:"100%", border:"1px solid gray", }}
          />
          </Form.Item>
        )}
        name={name}
      />
    </div>
  );
};

export default CWInput;
