
type TProps = {
    type: "submit" | "reset" | "button" ,
    children: string,
    disabled?: boolean
}

const Button = ({ type , children, disabled=false}:TProps) => {
  return <button disabled={disabled} style={{padding:"10px", width:"150px", background:"#233E43", border:"white", borderRadius:"5px", color:"white", cursor:"pointer"}} type={type}>{children}</button>;
};

export default Button;
