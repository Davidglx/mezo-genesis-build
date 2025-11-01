
//importing relevant modules
import Layout from '../ui/widgets/Layout'
import Landingpage from '../ui/widgets/Landingpage';
import Slider from '../ui/components/Slider';


// JSX Component
export default function Home() {
  const setBackground: boolean = false;
  return (
     <Layout background={setBackground}>
        <Landingpage />
        <Slider />
     </Layout>
  )
}
