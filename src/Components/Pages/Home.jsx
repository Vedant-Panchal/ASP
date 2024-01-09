import React from 'react'

function Home() {
  return (
    <section className="bg-white dark:bg-gray-900 h-screen flex items-center justify-center">
    <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
      
      <div className='w-1/2 lg:w-[80%] mx-auto'>
      <svg  viewBox="0 0 805 805" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect  fill="#ffff0"/>
<path d="M77.5359 557L121.936 237H224.336L268.736 557H256.536L213.936 246.7H132.336L89.7359 557H77.5359ZM125.936 557L136.736 478.6H209.536L220.336 557H207.936L199.936 488.2H146.336L138.336 557H125.936ZM101.536 557L139.536 256.5H206.736L244.736 557H232.336L221.136 469H125.136L113.936 557H101.536ZM125.936 459.4H219.936L209.336 366.9L196.336 266.2H149.936L136.536 366.9L125.936 459.4ZM139.536 449.8L148.036 366.9L157.936 275.2H188.336L198.636 366.9L206.736 449.8H139.536ZM151.936 440.2H194.336L187.536 366.9L179.536 285H166.736L158.736 366.9L151.936 440.2ZM398.705 561C369.638 561 348.105 554.967 334.105 542.9C320.171 530.767 312.638 510 311.505 480.6C311.371 477.2 311.305 472.533 311.305 466.6C311.305 460.667 311.438 454.867 311.705 449.2C311.971 443.533 312.438 439.467 313.105 437H325.005C324.538 438.867 324.138 442.267 323.805 447.2C323.538 452.067 323.371 457.467 323.305 463.4C323.238 469.333 323.305 474.9 323.505 480.1C324.505 506.233 331.038 524.667 343.105 535.4C355.171 546.067 373.705 551.4 398.705 551.4C424.838 551.4 443.771 545.9 455.505 534.9C467.238 523.833 473.638 505.567 474.705 480.1C474.838 476.7 474.938 473.533 475.005 470.6C475.138 467.667 475.205 464.733 475.205 461.8C475.271 458.8 475.238 455.5 475.105 451.9C474.438 434.767 469.338 420.467 459.805 409C450.338 397.467 437.138 389.367 420.205 384.7L379.405 373.4C375.005 372.133 371.205 370.1 368.005 367.3C364.871 364.5 362.438 360.933 360.705 356.6C359.038 352.267 358.105 347.233 357.905 341.5C357.705 335.967 357.605 331.367 357.605 327.7C357.605 323.967 357.705 319.467 357.905 314.2C358.505 299.133 361.971 288.233 368.305 281.5C374.705 274.767 384.838 271.4 398.705 271.4C411.705 271.4 421.238 274.7 427.305 281.3C433.438 287.9 436.838 298.967 437.505 314.5C437.705 319.567 437.705 326.2 437.505 334.4C437.371 342.6 437.138 350.133 436.805 357H424.805C425.138 349.733 425.371 342.267 425.505 334.6C425.705 326.867 425.705 320.267 425.505 314.8C425.038 301.733 422.471 292.833 417.805 288.1C413.205 283.367 406.838 281 398.705 281C389.705 281 382.771 283.467 377.905 288.4C373.038 293.267 370.338 302.333 369.805 315.6C369.671 319.467 369.605 323.533 369.605 327.8C369.671 332 369.771 336.433 369.905 341.1C370.038 344.767 370.571 348 371.505 350.8C372.505 353.533 373.905 355.8 375.705 357.6C377.505 359.333 379.638 360.567 382.105 361.3L422.705 373C442.638 378.667 458.171 388.3 469.305 401.9C480.438 415.433 486.371 431.933 487.105 451.4C487.238 454.467 487.271 457.667 487.205 461C487.205 464.333 487.138 467.667 487.005 471C486.938 474.333 486.838 477.533 486.705 480.6C485.505 509.267 478.105 529.833 464.505 542.3C450.971 554.767 429.038 561 398.705 561ZM398.705 541.8C377.638 541.8 362.071 537.133 352.005 527.8C341.938 518.4 336.438 502.367 335.505 479.7C335.371 475.3 335.305 470.233 335.305 464.5C335.371 458.767 335.505 453.367 335.705 448.3C335.971 443.167 336.338 439.4 336.805 437H348.705C348.305 439.933 347.971 443.833 347.705 448.7C347.505 453.5 347.371 458.633 347.305 464.1C347.305 469.5 347.371 474.567 347.505 479.3C348.238 498.367 352.605 511.967 360.605 520.1C368.671 528.167 381.371 532.2 398.705 532.2C417.038 532.2 430.105 527.967 437.905 519.5C445.705 511.033 449.971 497.567 450.705 479.1C450.838 475.7 450.938 472.633 451.005 469.9C451.138 467.1 451.205 464.367 451.205 461.7C451.271 458.967 451.238 456.033 451.105 452.9C450.838 445.233 449.238 438.4 446.305 432.4C443.438 426.4 439.371 421.367 434.105 417.3C428.905 413.167 422.605 410.133 415.205 408.2L374.005 397.2C366.671 395.2 360.038 391.933 354.105 387.4C348.171 382.8 343.405 376.767 339.805 369.3C336.205 361.833 334.238 352.8 333.905 342.2C333.771 338.067 333.671 334.533 333.605 331.6C333.605 328.667 333.605 325.833 333.605 323.1C333.671 320.3 333.771 317.167 333.905 313.7C334.838 291.367 340.438 275.533 350.705 266.2C360.971 256.867 376.971 252.2 398.705 252.2C420.438 252.2 436.105 257.033 445.705 266.7C455.371 276.3 460.638 292.033 461.505 313.9C461.705 318.967 461.705 325.8 461.505 334.4C461.371 342.933 461.105 350.467 460.705 357H448.805C449.138 350.067 449.371 342.433 449.505 334.1C449.705 325.767 449.705 319.167 449.505 314.3C448.771 295.233 444.371 281.733 436.305 273.8C428.238 265.8 415.705 261.8 398.705 261.8C381.838 261.8 369.005 265.6 360.205 273.2C351.471 280.8 346.705 294.367 345.905 313.9C345.638 319.767 345.538 324.6 345.605 328.4C345.671 332.133 345.771 336.633 345.905 341.9C346.171 349.567 347.505 356.367 349.905 362.3C352.371 368.233 355.871 373.167 360.405 377.1C364.938 380.967 370.371 383.767 376.705 385.5L417.705 396.5C430.771 399.967 441.438 406.333 449.705 415.6C458.038 424.867 462.505 437.133 463.105 452.4C463.238 455.133 463.305 457.767 463.305 460.3C463.305 462.767 463.238 465.5 463.105 468.5C463.038 471.5 462.905 475.2 462.705 479.6C461.838 501.6 456.471 517.467 446.605 527.2C436.805 536.933 420.838 541.8 398.705 541.8ZM398.705 522.6C385.638 522.6 375.971 519.3 369.705 512.7C363.505 506.033 360.105 494.733 359.505 478.8C359.371 474.133 359.305 469.233 359.305 464.1C359.305 458.9 359.405 453.933 359.605 449.2C359.871 444.4 360.171 440.333 360.505 437H372.405C372.138 440.2 371.871 444.033 371.605 448.5C371.405 452.967 371.271 457.8 371.205 463C371.205 468.133 371.305 473.3 371.505 478.5C371.971 491.033 374.371 499.933 378.705 505.2C383.038 510.4 389.705 513 398.705 513C408.238 513 415.171 510.3 419.505 504.9C423.838 499.5 426.238 490.633 426.705 478.3C426.905 473.7 427.038 470 427.105 467.2C427.238 464.4 427.305 462 427.305 460C427.305 458 427.238 455.9 427.105 453.7C426.971 449.9 426.205 446.533 424.805 443.6C423.471 440.6 421.571 438.1 419.105 436.1C416.705 434.1 413.738 432.633 410.205 431.7L368.705 420.6C356.505 417.333 346.105 412.167 337.505 405.1C328.905 398.033 322.238 389.267 317.505 378.8C312.838 368.267 310.305 356.333 309.905 343C309.705 336.533 309.605 331.133 309.605 326.8C309.605 322.467 309.705 317.867 309.905 313C311.105 284.467 318.571 264 332.305 251.6C346.105 239.2 368.238 233 398.705 233C427.838 233 449.271 239.067 463.005 251.2C476.805 263.267 484.305 283.867 485.505 313C485.705 318.067 485.705 325.133 485.505 334.2C485.371 343.267 485.105 350.867 484.705 357H472.705C473.105 350.8 473.371 343.333 473.505 334.6C473.705 325.8 473.705 318.767 473.505 313.5C472.438 288.233 466.138 270.1 454.605 259.1C443.071 248.1 424.438 242.6 398.705 242.6C372.905 242.6 353.905 247.967 341.705 258.7C329.571 269.433 322.971 287.667 321.905 313.4C321.638 319.467 321.538 324.533 321.605 328.6C321.671 332.6 321.771 337.267 321.905 342.6C322.305 354.067 324.471 364.3 328.405 373.3C332.338 382.233 337.905 389.7 345.105 395.7C352.371 401.7 361.138 406.1 371.405 408.9L412.705 420C418.171 421.467 422.805 423.733 426.605 426.8C430.471 429.8 433.471 433.533 435.605 438C437.738 442.467 438.905 447.567 439.105 453.3C439.238 455.9 439.271 458.367 439.205 460.7C439.205 463.033 439.171 465.6 439.105 468.4C439.038 471.133 438.905 474.533 438.705 478.6C438.038 494.267 434.638 505.533 428.505 512.4C422.371 519.2 412.438 522.6 398.705 522.6ZM540.93 557V237H626.13C644.196 237 659.463 239.3 671.93 243.9C684.463 248.5 694.096 256.467 700.83 267.8C707.63 279.067 711.396 294.8 712.13 315C712.463 326.067 712.63 336.467 712.63 346.2C712.696 355.867 712.53 366.267 712.13 377.4C711.396 397.533 707.63 413.267 700.83 424.6C694.096 435.933 684.463 443.9 671.93 448.5C659.463 453.1 644.196 455.4 626.13 455.4H600.93V557H588.93V445H626.13C641.33 445 654.33 443.1 665.13 439.3C675.93 435.433 684.296 428.567 690.23 418.7C696.23 408.833 699.53 394.933 700.13 377C700.396 369.467 700.563 362.467 700.63 356C700.763 349.533 700.763 343.067 700.63 336.6C700.563 330.067 700.396 323 700.13 315.4C699.53 297.733 696.296 283.967 690.43 274.1C684.563 264.233 676.23 257.333 665.43 253.4C654.696 249.4 641.596 247.4 626.13 247.4H552.93V557H540.93ZM564.93 557V257.8H626.13C638.73 257.8 649.53 259.467 658.53 262.8C667.596 266.067 674.63 271.9 679.63 280.3C684.696 288.7 687.53 300.533 688.13 315.8C688.463 324.267 688.663 333.433 688.73 343.3C688.863 353.167 688.663 364.267 688.13 376.6C687.53 391.867 684.696 403.7 679.63 412.1C674.63 420.5 667.596 426.367 658.53 429.7C649.53 432.967 638.73 434.6 626.13 434.6H576.93V557H564.93ZM576.93 424.2H626.13C641.463 424.2 653.463 420.967 662.13 414.5C670.796 407.967 675.463 395.2 676.13 376.2C676.396 369 676.563 362.2 676.63 355.8C676.763 349.4 676.763 343 676.63 336.6C676.563 330.133 676.396 323.333 676.13 316.2C675.463 297.267 670.796 284.533 662.13 278C653.463 271.467 641.463 268.2 626.13 268.2H576.93V424.2ZM588.93 413.8V278.6H626.13C638.33 278.6 647.563 281.3 653.83 286.7C660.163 292.1 663.596 302.067 664.13 316.6C664.463 323.867 664.663 330.667 664.73 337C664.796 343.333 664.763 349.633 664.63 355.9C664.563 362.1 664.396 368.733 664.13 375.8C663.596 390.333 660.163 400.3 653.83 405.7C647.563 411.1 638.33 413.8 626.13 413.8H588.93ZM600.93 403.4H626.13C633.863 403.4 640.063 401.567 644.73 397.9C649.396 394.167 651.863 386.667 652.13 375.4C652.263 367.2 652.363 358.133 652.43 348.2C652.496 338.2 652.396 327.8 652.13 317C651.863 305.733 649.396 298.267 644.73 294.6C640.063 290.867 633.863 289 626.13 289H600.93V403.4Z" fill="url(#paint0_linear_18_24936)"/>
<defs>
<linearGradient id="paint0_linear_18_24936" x1="161.409" y1="76.063" x2="655.174" y2="669.514" gradientUnits="userSpaceOnUse">
<stop stop-color="#F24822"/>
<stop offset="0.494792" stop-color="#FF26C5" stop-opacity="0.75"/>
<stop offset="1" stop-color="#0072C4"/>
</linearGradient>
</defs>
</svg>



      </div>
      <div className="mt-4 md:mt-0">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          Let's create more tools and ideas that brings us together.
        </h2>
        <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
          Flowbite helps you connect with friends and communities of people who
          share your interests. Connecting with your friends and family as well as
          discovering new ones is easy with features like Groups.
        </p>
        <a
          href="#"
          className="inline-flex items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900"
        >
          Get started
          <svg
            className="ml-2 -mr-1 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </div>
  </section>
  
  )
}

export default Home