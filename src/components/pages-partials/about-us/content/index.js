export default function Content() {
  return (
    <div className="bg-theme-white lg:py-16 py-8">
      <div className="max-w-7xl  mx-auto ">
        <div className="flex lg:flex-row flex-col  mx-[2rem] lg:mx-0">
          <div className="lg:mx-5 space-y-3">
            <div className="flex lg:flex-row flex-col-reverse mx-auto">
              <div className="main flex row-auto lg:mx-10 lg:my-0 my-5">
                <div className="my-5 mx-5">
                  <img
                    src="/svg/content_image1.svg"
                    alt=""
                    className="mt-8 drop-shadow-xl"
                  />
                </div>
                <div>
                  <img
                    src="/svg/content_image2.svg "
                    className="drop-shadow-lg"
                    alt=""
                  />
                  <img
                    src="/svg/content_image3.svg"
                    alt=""
                    className="my-3 drop-shadow-xl"
                  />
                </div>
              </div>
              <div className="lg:w-2/5 w-full lg:mx-4 mt-4  space-y-3">
                <p className="lg:text-base text-sm font-bold text-theme-blue">
                  About Us{' '}
                </p>
                <h1 className="lg:text-[40px] text-[32px] font-bold font-[Georgia]">
                  Local Excellence and Global Reach
                </h1>
                <p className="text-sm leading-6">
                  Our mission is to provide you with accessible and
                  comprehensive healthcare services. Book appointments with
                  experienced healthcare professionals and receive quality care
                  tailored to your needs. Join us today and take the first step
                  towards better health.
                </p>
                <div className="mx-5 space-y-1">
                  <div className="flex row-auto">
                    <img src="/svg/content_vector.svg"></img>
                    <p className="lg:text-base text-[14px] font-bold mx-2">
                      Multiple Services with flexible schedule
                    </p>
                  </div>
                  <p className="text-sm font-small mx-8 leading-6">
                    Our team of healthcare professionals is highly trained and
                    dedicated to providing compassionate and comprehensive care
                    to all our patients.
                  </p>
                </div>

                <div className="mx-5 space-y-1">
                  <div className="flex row-auto">
                    <img src="/svg/content_vector.svg"></img>
                    <p className="lg:text-base text-sm font-bold mx-2">
                      Skilled and experienced healthcare professionals
                    </p>
                  </div>
                  <p className="text-sm font-small mx-8 leading-6">
                    Our team of healthcare professionals is highly trained and
                    dedicated to providing compassionate and comprehensive care
                    to all our patients.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
