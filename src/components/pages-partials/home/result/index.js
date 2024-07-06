export default function Result() {
  return (
    <div className="bg-theme-gray mt-20 ">
      <div className="max-w-7xl mx-auto ">
        <div className=" py-10 px-2">
          <h5 className="text-center text-2xl sm:text-4xl font-bold text-theme-blue mb-12 font-sans mx-auto w-full">
            Why Choose HealthHub?
          </h5>
          <div className="flex lg:flex-row flex-col-reverse ">
            <div className="flex-1 flex-col ml-12 lg:ml-0 mt-20 lg:mt-0 ">
              <h1 className=" text-3xl lg:w-7/12 w-8/12 font-[Georgia] font-bold not-italic leading-none pb-6">
                {' '}
                Excellence in Healthcare, Guaranteed!
              </h1>
              <p className="lg:w-11/12 w-10/12 text-sm font-sans font-normal pb-9 leading-normal ml-4">
                <ul className="space-y-5 list-disc">
                  <li>
                    <div className="font-bold text-lg">
                      Personalized Care Plans:
                    </div>
                    <div className="text-base">
                      We understand that each patient is unique, and we provide
                      personalized care plans tailored to your specific needs
                      and health goals.
                    </div>
                  </li>
                  <li>
                    <div className="font-bold text-lg ">
                      Advanced Technology and Treatments:
                    </div>{' '}
                    <div className="text-base">
                      Our state-of-the-art facilities are equipped with the
                      latest medical technology to ensure accurate diagnoses and
                      effective treatments.
                    </div>
                  </li>
                  <li>
                    <div className="font-bold text-lg">
                      Experienced and Compassionate Staff:
                    </div>{' '}
                    <div className="text-base">
                      Our team of healthcare professionals is highly trained and
                      dedicated to providing compassionate and comprehensive
                      care to all our patients.
                    </div>
                  </li>
                </ul>
              </p>
              {/* <div>
                  <button className="border border-color p-2 lg:px-7 lg:py-3 px-6 py-3 rounded-lg bg-theme-blue text-theme-white font-sans lg:text-base text-sm font-bold bg-theme-white-hover text-theme-blue-hover ">
                    READ MORE
                  </button>
                </div> */}
            </div>
            <div className="lg:ml-12  mx-10 lg:mx-0 ">
              <img src="/svg/result-card.svg" alt="result picture " />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
