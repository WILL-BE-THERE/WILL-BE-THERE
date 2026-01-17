type TitleProps = {
  text: string
}

const Title = ({ text }: TitleProps) => {
  return <h1 className="text-center text-3xl mt-14 font-semibold">{text}</h1>
}
export default Title
