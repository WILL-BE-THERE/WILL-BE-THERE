import brandsIcon from '../../assets/brands-icon.png'

const BrandSection = () => {
  return (
    <section className="flex flex-col gap-10 pt-10 pb-32 bg-white sm:pb-44">
      <h1 className="text-neutral-200 text-2xl font-semibold text-center">
        Popular brands that trust us
      </h1>
      <div className="w-full mx-auto sm:w-[70%]">
        <img src={brandsIcon} alt="brands icon" className="w-full" />
      </div>
    </section>
  )
}
export default BrandSection
