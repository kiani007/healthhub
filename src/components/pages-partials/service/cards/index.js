export default function Cards() {
  const cardItems = [
    {
      title: 'General Consultation',
      description:
        'This core function allows you to track and manage your overall health. Monitor vitals like blood pressure, blood sugar, weight, temperature, and oxygen levels. You can also view your immunizations, lab test results, and medication history – all in one place.',
      image: '/img/doctor.jpg',
    },
    {
      title: 'Dental Care',
      description:
        'Schedule appointments, track dental procedures, and manage your oral health routine. Access past dental records and X-rays (if applicable).',
      image: '/img/dentist.jpg',
    },
    {
      title: 'Pediatrics',
      description:
        "Manage your child's health journey!  Track growth charts, immunization records, and medication schedules. Receive appointment reminders and access educational resources for child development.",
      image: '/img/pediatrics.jpg',
    },
  ]
  return (
    <div className="my-20 px-10 flex justify-center ">
      <div className="grid grid-cols-3 gap-4">
        {cardItems.map((item) => (
          <div
            key={item.title}
            class="max-w-sm rounded overflow-hidden shadow-lg"
          >
            <img
              class="w-full"
              src={item.image}
              alt={item.title}
              style={{ height: '300px' }}
            />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">{item.title}</div>
              <p class="text-gray-700 text-base">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
