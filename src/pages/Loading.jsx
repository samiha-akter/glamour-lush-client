import { GridLoader} from "react-spinners";
const Loading = () => {
  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center">
      <GridLoader
        color="#B03052"
        loading={true}
      />
    </div>
  )
}

export default Loading
