
const LayoutAnonymous: React.FC<{}> = props => {
    return (
      <div>
        <p>LayoutAnonymous</p>
        {props.children}
      </div>
    )
  }
  
  export default LayoutAnonymous;