import { Container } from "@mui/material";
import Carousel from "./components/Carousel";

const App = () => {
  const streamUrl =
    "https://rr2---sn-o0nbb52v2-npoe.googlevideo.com/videoplayback?expire=1737228225&ei=YauLZ6a1If2Ng8UPj76heA&ip=137.132.26.37&id=o-AMFLNOgVUIZlw3pHYh6i5lsRoDnLIWpUZaiTODe0e0yZ&itag=137&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1737206625%2C&mh=9v&mm=31%2C29&mn=sn-o0nbb52v2-npoe%2Csn-npoe7nl6&ms=au%2Crdu&mv=m&mvi=2&pcm2cms=yes&pl=24&rms=au%2Cau&initcwndbps=5308750&bui=AY2Et-MZh1RxTy-dqWhusuVzyhfV_0Tcu1zthpd8FD9NajrZ5Cy38bEQSiD1xcwij6lHQ98CZ6oNgWkL&spc=9kzgDdp9xOhC07Hu&vprv=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=4013989&dur=20.720&lmt=1652124010960255&mt=1737206233&fvip=3&keepalive=yes&fexp=51326932%2C51335594%2C51353498%2C51371294%2C51384461&c=ANDROID_VR&txp=6319224&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIgEJl-SNKoVOcntrACQYIGE4iuqe_yJcxw9vMCp80dyxACIQCnZIZcUTIiCOUodxETf7kE0-Uc7Tm87toONsUhj5wQzg%3D%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpcm2cms%2Cpl%2Crms%2Cinitcwndbps&lsig=AGluJ3MwRQIhANoDz5TrZt-bfHFXZ9iYOwsQM4uAsmr33odOqj5r4XyqAiBjBLMQ1J6SVO22_3parHkb3Ybh4k3P7bX-RzJpdm8HRQ%3D%3D";

  return (
    <Container
      maxWidth={false}
      disableGutters
      style={{
        background: "#d1c4e9",
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Carousel />
    </Container>
  );
};

export default App;
