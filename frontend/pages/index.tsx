
//importing relevant modules
import Layout from '../ui/widgets/Layout'
import Landingpage from '../ui/widgets/Landingpage';

// JSX Component
export default function Home() {
  const setBackground: boolean = false;
  return (
     <Layout background={setBackground}>
        <Landingpage />
     </Layout>
  )
}
