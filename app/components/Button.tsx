const Button = (props: any) => {
    return (
        
        <button id={props.id} onClick={props.onClick}>{props.text}</button>  
    );
  };
  
  export default Button;