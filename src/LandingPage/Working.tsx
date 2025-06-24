function Working() {
  return (
    <div>
      {/* Header Section */}
      <div className='pb-5 mt-10 md:mt-20'>
        <div className='text-center text-3xl md:text-4xl font-semibold mb-6 md:mb-10 text-mine-shaft-100'>
          How it <span className='text-bright-sun-400'> Works</span>
        </div>
        <div className='text-base md:text-lg mb-8 md:mb-10 text-mine-shaft-300 text-center w-[90%] md:w-1/2 mx-auto px-4 md:px-0'>
          Effortlessly Navigate through the process and land your dream job.
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-5 px-4 md:px-16 justify-between items-center">
        {/* Image Section */}
        <div className="w-full md:w-auto md:ml-20"> 
          <img className="w-full md:w-[30rem] object-contain" src="/Boy.png" alt="boy" />
        </div>

        {/* Steps Section */}
        <div className="w-full md:w-auto flex flex-col">
          {/* Build Resume Step */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-bright-sun-300 rounded-full">
                <img className="h-10 w-10 md:h-12 md:w-12" src="/Working/Build your resume.png" alt="build resume" />
              </div>
            </div>
            <div>
              <div className="text-mine-shaft-200 text-lg md:text-xl font-semibold text-center mt-3">
                Build your resume
              </div>
              <div className="text-mine-shaft-300 text-center text-sm md:text-base px-4 md:px-0">
                Create a compelling resume that showcases your skills and experience.
              </div>
            </div>
          </div>

          {/* Apply for Job Step */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-bright-sun-300 rounded-full">
                <img className="h-10 w-10 md:h-12 md:w-12" src="/Working/Apply for job.png" alt="apply job" />
              </div>
            </div>
            <div>
              <div className="text-mine-shaft-200 text-lg md:text-xl font-semibold text-center mt-3">
                Apply For Job
              </div>
              <div className="text-mine-shaft-300 text-center text-sm md:text-base px-4 md:px-0">
                Browse and apply to jobs that match your skills and interests.
              </div>
            </div>
          </div>

          {/* Get Hired Step */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-bright-sun-300 rounded-full">
                <img className="h-10 w-10 md:h-12 md:w-12" src="/Working/Get hired.png" alt="get hired" />
              </div>
            </div>
            <div>
              <div className="text-mine-shaft-200 text-lg md:text-xl font-semibold text-center mt-3">
                Get Hired
              </div>
              <div className="text-mine-shaft-300 text-center text-sm md:text-base px-4 md:px-0">
                Interview, receive offers, and start your new career journey.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Working