// import React from "react";
// import { CheckCircle } from "lucide-react";
// import {
//   Container,
//   Title,
//   CarouselWrapper,
//   GreenBackground,
//   ScrollContainer,
//   CardsWrapper,
//   TestimonialCard,
//   StarsWrapper,
//   TestimonialText,
//   AuthorInfo,
//   Avatar,
//   AuthorDetails,
//   AuthorName,
//   AuthorRole,
//   ScrollHint,
// } from "./index.styled";

// const steps = [
//   {
//     text: "Connect your crypto wallet to Mezo securely to get started. We support MetaMask, Coinbase, and WalletConnect.",
//     name: "Step 1",
//     role: "Add Wallet",
//     image: "https://cdn-icons-png.flaticon.com/512/1149/1149168.png",
//   },
//   {
//     text: "Choose your preferred blockchain network (Ethereum, BNB Chain, or Polygon) for transactions.",
//     name: "Step 2",
//     role: "Select Network",
//     image: "https://cdn-icons-png.flaticon.com/512/1086/1086741.png",
//   },
//   {
//     text: "Enter the amount, review your transaction details, and confirm to proceed on the blockchain.",
//     name: "Step 3",
//     role: "Confirm Transaction",
//     image: "https://cdn-icons-png.flaticon.com/512/2886/2886663.png",
//   },
//   {
//     text: "Track your transaction status and view confirmations directly on your Mezo dashboard.",
//     name: "Step 4",
//     role: "Monitor Progress",
//     image: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
//   },
//   {
//     text: "Earn rewards for completed transactions and enjoy the seamless Mezo blockchain experience!",
//     name: "Step 5",
//     role: "Earn Rewards",
//     image: "https://cdn-icons-png.flaticon.com/512/929/929422.png",
//   },
// ];

// const StepsCarousel: React.FC = () => {
//   return (
//     <Container>
//       <Title>STEPS TO USE MEZO</Title>

//       <CarouselWrapper>
//         <GreenBackground />

//         <ScrollContainer>
//           <CardsWrapper>
//             {steps.map((step, index) => (
//               <TestimonialCard key={index}>
//                 <StarsWrapper>
//                   <CheckCircle size={26} color="#16a34a" />
//                 </StarsWrapper>

//                 <TestimonialText>"{step.text}"</TestimonialText>

//                 <AuthorInfo>
//                   <Avatar src={step.image} alt={step.name} />
//                   <AuthorDetails>
//                     <AuthorName>{step.name}</AuthorName>
//                     <AuthorRole>{step.role}</AuthorRole>
//                   </AuthorDetails>
//                 </AuthorInfo>
//               </TestimonialCard>
//             ))}
//           </CardsWrapper>
//         </ScrollContainer>
//       </CarouselWrapper>

//       <ScrollHint>← Scroll to see all steps →</ScrollHint>
//     </Container>
//   );
// };

// export default StepsCarousel;




import React from "react";
import { CheckCircle } from "lucide-react";
import {
  Container,
  Title,
  Subtitle,
  CarouselWrapper,
  GradientBackground,
  ScrollContainer,
  CardsWrapper,
  StepCard,
  StepIconWrapper,
  StepText,
  StepInfo,
  Avatar,
  StepDetails,
  StepName,
  StepRole,
  ScrollHint,
} from "./index.styled";

const steps = [
  {
    text: "Connect your crypto wallet to Mezo securely to get started. We support MetaMask, Coinbase, and WalletConnect.",
    name: "Step 1",
    role: "Add Wallet",
    image: "https://cdn-icons-png.flaticon.com/512/1149/1149168.png",
  },
  {
    text: "Choose your preferred blockchain network (Ethereum, BNB Chain, or Polygon) for transactions.",
    name: "Step 2",
    role: "Select Network",
    image: "https://cdn-icons-png.flaticon.com/512/1086/1086741.png",
  },
  {
    text: "Enter the amount, review your transaction details, and confirm to proceed on the blockchain.",
    name: "Step 3",
    role: "Confirm Transaction",
    image: "https://cdn-icons-png.flaticon.com/512/2886/2886663.png",
  },
  {
    text: "Track your transaction status and view confirmations directly on your Mezo dashboard.",
    name: "Step 4",
    role: "Monitor Progress",
    image: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
  },
  {
    text: "Earn rewards for completed transactions and enjoy the seamless Mezo blockchain experience!",
    name: "Step 5",
    role: "Earn Rewards",
    image: "https://cdn-icons-png.flaticon.com/512/929/929422.png",
  },
];

const StepsCarousel: React.FC = () => {
  return (
    <Container>
      <Title>Steps to Use Mezo</Title>
      <Subtitle>Follow these simple steps to start your blockchain journey.</Subtitle>

      <CarouselWrapper>
        <GradientBackground />
        <ScrollContainer>
          <CardsWrapper>
            {steps.map((step, index) => (
              <StepCard key={index}>
                <StepIconWrapper>
                  <CheckCircle size={26} color="#16a34a" />
                </StepIconWrapper>

                <StepText>“{step.text}”</StepText>

                <StepInfo>
                  <Avatar src={step.image} alt={step.name} />
                  <StepDetails>
                    <StepName>{step.name}</StepName>
                    <StepRole>{step.role}</StepRole>
                  </StepDetails>
                </StepInfo>
              </StepCard>
            ))}
          </CardsWrapper>
        </ScrollContainer>
      </CarouselWrapper>

      <ScrollHint>← Scroll horizontally to explore all steps →</ScrollHint>
    </Container>
  );
};

export default StepsCarousel;
