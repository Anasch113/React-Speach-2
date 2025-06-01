import React from 'react'

const EditControlsModal = ({
  settingsRef,
  showLineNumbers,
  setShowLineNumbers,
  fontFamily,
  handleFontFamilyChange,
  fontSize,
  handleFontSizeChange,
  handleLineSpacingChange,
  lineSpacing,
  textColor,
  handleTextColorChange,
  bgColor,
  handleBgColorChange,
  handleCheckboxChange,
  handleSettingsClick,
  fontFamilies,
  fontSizes,
  fontFamily2,
  fontSize2,
  textColor2,
  bgColor2,
  handleFontSizeChange2,
  handleFontFamilyChange2,
  handleTextColorChange2,
  handleBgColorChange2
}) => {



  return (
    <div ref={settingsRef} className="fixed px-14 -top-2 left-0 w-full overflow-y-scroll   z-20 flex justify-center items-center min-h-400 max-[800px]:px-5 max-[500px]:top-0">
      {/* Add your settings content here */}
      <div className="bg-blackGray te w-full h-2/3 p-4 items-center rounded-md shadow-md ">

        <div>
          <p>Main Settings</p>
        </div>
        {/* main div */}

        <div className='flex  justify-between w-full  p-5 max-[800px]:flex-wrap max-[500px]:flex-col max-[500px]:flex-nowrap'>
          {/* 1st div */}
          <div className='flex  flex-col gap-3 w-2/5 max-[500px]:w-full md:mt-10'>


            <span className='flex justify-between w-2/3'>
              <p className='text-sm font-sans'>Line Numbers</p>
              <input
                type="checkbox"
                checked={showLineNumbers}
                onChange={() => setShowLineNumbers(!showLineNumbers)}
              />
            </span>



          </div>
          {/* 2nd div Small Window*/}
          <div className='flex   flex-col gap-3 w-2/5 max-[800px]:w-2/4  max-[500px]:w-full '>

            <h1 className='text-xl font-sans font-medium'> Small Window Appearence </h1>

            <span className='flex items-center justify-between w-2/3'>

              <p className='text-sm font-sans'>Font</p>
              <select className='py-3 w-2/3 px-3 text-black  max-[1000px]:px-2 rounded-sm border border-gray-400' value={fontFamily2}
                onChange={handleFontFamilyChange2}>
                {
                  fontFamilies.map((fonts, i) => (
                    <option style={{ fontFamily: `${fonts}` }} key={i} value={fonts}>{fonts}</option>
                  ))
                }
              </select>

            </span>

            <span className='flex items-center justify-between w-2/3'>

              <p className='text-sm font-sans'>Font Size</p>
              <select className='py-3 w-2/3 rounded-sm px-3 text-black  border border-gray-400' value={fontSize2}
                onChange={handleFontSizeChange2}>

                {
                  fontSizes.map((fonts, i) => (
                    <option key={i} value={fonts}>{`${fonts}px`}</option>
                  ))
                }


              </select>

            </span>

            {/* <span className='flex items-center justify-between w-2/3'>

              <p className='text-sm font-sans'>Line Spacing</p>
              <select value={lineSpacing} onChange={handleLineSpacingChange} className='py-3 w-2/3 px-3  max-[1000px]:px-2 rounded-sm border border-gray-400 text-black'
              >
                <option value="single">Single</option>
                <option value="20px">1.5</option>
                <option value="30px">Double</option>
              </select>

            </span> */}



            <div className="flex items-center justify-between w-2/3">
              <p className="text-sm font-sans">Text Color</p>
              <input
                className='w-6'
                type="color"
                value={textColor2}
                onChange={handleTextColorChange2}
              />
            </div>

            <div className="flex items-center justify-between w-2/3">
              <p className="text-sm font-sans">Background Color</p>
              <input
                className='w-6 '
                type="color"
                value={bgColor2}
                onChange={handleBgColorChange2}
              />
            </div>

          </div>
          {/* 2nd div large widnow */}
          <div className='flex   flex-col gap-3 w-2/5 max-[800px]:w-2/4  max-[500px]:w-full '>

            <h1 className='text-xl font-sans font-medium'>Large Window Appearence </h1>

            <span className='flex items-center justify-between w-2/3'>

              <p className='text-sm font-sans'>Font</p>
              <select className='py-3 w-2/3 px-3 text-black  max-[1000px]:px-2 rounded-sm border border-gray-400' value={fontFamily}
                onChange={handleFontFamilyChange}>
                {
                  fontFamilies.map((fonts, i) => (
                    <option style={{ fontFamily: `${fonts}` }} key={i} value={fonts}>{fonts}</option>
                  ))
                }
              </select>

            </span>

            <span className='flex items-center justify-between w-2/3'>

              <p className='text-sm font-sans'>Font Size</p>
              <select className='py-3 w-2/3 rounded-sm px-3 text-black  border border-gray-400' value={fontSize}
                onChange={handleFontSizeChange}>

                {
                  fontSizes.map((fonts, i) => (
                    <option key={i} value={fonts}>{`${fonts}px`}</option>
                  ))
                }


              </select>

            </span>

            <span className='flex items-center justify-between w-2/3'>

              <p className='text-sm font-sans'>Line Spacing</p>
              <select value={lineSpacing} onChange={handleLineSpacingChange} className='py-3 w-2/3 px-3  max-[1000px]:px-2 rounded-sm border border-gray-400 text-black'
              >
                <option value="single">Single</option>
                <option value="20px">1.5</option>
                <option value="30px">Double</option>
              </select>

            </span>



            <div className="flex items-center justify-between w-2/3">
              <p className="text-sm font-sans">Text Color</p>
              <input
                className='w-6'
                type="color"
                value={textColor}
                onChange={handleTextColorChange}
              />
            </div>

            <div className="flex items-center justify-between w-2/3">
              <p className="text-sm font-sans">Background Color</p>
              <input
                className='w-6 '
                type="color"
                value={bgColor}
                onChange={handleBgColorChange}
              />
            </div>

          </div>
          {/* 3rd div */}
          <div className='flex  flex-col gap-3 w-2/5  max-[800px]:w-2/4  max-[500px]:w-full'>

            <h1 className='font-medium text-xl font-sans '>Interface Settings</h1>

            <span className='flex justify-between w-2/3'>
              <p className='text-sm font-sans'>Hide Header</p>
              <input onChange={handleCheckboxChange} type="checkbox" />
            </span>
            {/* <h1 className='font-medium text-xl font-sans '>Haptic Settings</h1>


            <span className='flex  justify-between w-full'>
              <p className='text-sm font-sans'>Pattern(s) Search</p>
              <input className='w-2/4 text-end p-1 border border-gray-300 shadow-sm rounded-sm' type="search" />
            </span>

            <span className='flex justify-between w-2/3'>
              <p className='text-sm font-sans'>Enbale Pushes</p>
              <input type="checkbox" />
            </span>

            <span className='flex justify-between w-2/3'>
              <p className='text-sm font-sans'>Case Sensitive</p>
              <input type="checkbox" />
            </span> */}

          </div>

        </div>
        <span className='flex items-end   w-full justify-center'>
          <button className="text-white px-4 py-1 rounded-md w-56 bg-red-700" onClick={handleSettingsClick}>
            Close
          </button>
        </span>


      </div>
    </div>
  )
}

export default EditControlsModal
