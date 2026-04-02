import React from 'react'
import './Carousel.css'

const base = import.meta.env.BASE_URL || '/'

const allImages = [
  'port_pics/1202270F-A3D1-4243-8239-64EE02623CC6_1_105_c.jpeg',
  'port_pics/20231022_225223.jpg',
  'port_pics/20240218_232654.jpg',
  'port_pics/20240707_190859.jpg',
  'port_pics/20240707_192116.jpg',
  'port_pics/20240707_192304.jpg',
  'port_pics/20240922_065150.jpg',
  'port_pics/20241015_073520.jpg',
  'port_pics/20250109_180658.jpg',
  'port_pics/20250110_173410.jpg',
  'port_pics/20250111_164538.jpg',
  'port_pics/20250514_141016.jpg',
  'port_pics/2A6B493F-ADD5-4E9D-8BB5-360E85129662_1_105_c.jpeg',
  'port_pics/2C26CB48-5B41-4C8A-91C7-AC3CF0603234_1_105_c.jpeg',
  'port_pics/349BD4D5-F809-455E-A933-C292A81D286E_1_105_c.jpeg',
  'port_pics/4E5B6F5C-2612-4E3E-AA8A-9CB7ACCB8B26_1_105_c.jpeg',
  'port_pics/56268EF9-C328-47C5-861F-1C9BC0FF7603_1_105_c.jpeg',
  'port_pics/5C3D1451-C048-4905-96B2-195B5E07BB92_1_105_c.jpeg',
  'port_pics/6A6BA079-C4AB-45D1-895F-20C9C6D3F3CF_1_105_c.jpeg',
  'port_pics/6D21142F-A044-4901-ADD3-320D19CD247B_1_105_c.jpeg',
  'port_pics/6DB1A8DB-F9A7-4BDD-97B4-62B1C2157A43_1_105_c.jpeg',
  'port_pics/6FDFB16A-829F-457C-A76E-EFEE5FD362D1_1_105_c.jpeg',
  'port_pics/72EE9B1B-8088-41B6-BD7B-C40104FC5406_1_105_c.jpeg',
  'port_pics/75774478-B5CC-4AB3-9DFA-BC7C5433A7AD_1_105_c.jpeg',
  'port_pics/A49EF801-976F-4E1A-979B-C8D338444696_1_105_c.jpeg',
  'port_pics/C1987444-99B4-49CC-A61C-2582A94DE267_1_105_c.jpeg',
  'port_pics/C9F7AFC1-1CA6-4599-B401-2397EADE00DF_1_105_c.jpeg',
  'port_pics/CAA5D870-7708-4B90-805D-DFF5717BDFB5_1_105_c.jpeg',
  'port_pics/CF3DD871-30D2-47D8-8304-529913EB6CA6_1_105_c.jpeg',
  'port_pics/DB0AF761-75DD-4467-937C-1122B376DB9C_1_105_c.jpeg',
  'port_pics/DEFD8B9D-C467-4DA1-8555-EC0F675875B4_1_105_c.jpeg',
  'port_pics/DFFC5A4D-16F6-4085-BC95-137B5B5F5552_1_105_c.jpeg',
  'port_pics/E46E103B-A211-4ECB-A5A7-A4B9AC10B0B4_1_105_c.jpeg',
  'port_pics/EAB2235C-9D48-441F-8E2C-C0469D5CE46C_1_105_c.jpeg',
  'port_pics/EF14579D-0223-4621-B0F2-2F41DA765EF2_1_105_c.jpeg',
  'port_pics/FB1CA521-2D79-4603-89E6-048D1263DF90_1_105_c.jpeg',
  'port_pics/FD5DE30D-5C85-4E42-9E85-8386CEDE87B6_1_105_c.jpeg',
  'port_pics/IMG20260228215629.jpg',
  'port_pics/IMG_1711-2.jpeg',
  'port_pics/IMG_3245.jpeg',
  'port_pics/IMG_3339.jpeg',
  'port_pics/IMG_3341.jpeg',
].map(path => base + path)

const midpoint = Math.ceil(allImages.length / 2)
const imagesRowOne = allImages.slice(0, midpoint)
const imagesRowTwo = allImages.slice(midpoint)

const Carousel = () => {
  return (
    <section className="carousel">
      <div className="carousel-row carousel-row--one">
        {[...imagesRowOne, ...imagesRowOne].map((src, index) => (
          <img key={`row1-${index}`} src={src} alt="Memory" className="carousel-image" />
        ))}
      </div>
      <div className="carousel-row carousel-row--two">
        {[...imagesRowTwo, ...imagesRowTwo].map((src, index) => (
          <img key={`row2-${index}`} src={src} alt="Memory" className="carousel-image" />
        ))}
      </div>
    </section>
  )
}

export default Carousel