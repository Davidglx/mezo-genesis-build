// // index.tsx
// import React from 'react';
// import { Star } from 'lucide-react';
// import {
//   Container,
//   Title,
//   CarouselWrapper,
//   GreenBackground,
//   GradientLeft,
//   GradientRight,
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
//   ScrollHint
// } from './index.styled';

// const testimonials = [
//   {
//     text: "This is single handedly the go-to business for my technology needs. they built and executed my music platform, I will be recommending this company to some of my friends in need of websites and apps.",
//     name: "Patrick Rodgers",
//     role: "Freelancer",
//     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
//   },
//   {
//     text: "Northstar helped me build a new PC gaming system for my stream set up so now I can play COD and other FSP games, I will gladly recommend for gaming system and PC building. Aaron knows his onions.",
//     name: "Robert Ireland",
//     role: "Graphic Designer",
//     image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
//   },
//   {
//     text: "I cannot believe that I have got a brand new landing page after getting Omega. It was super easy to edit and publish. Incase you need landing pages done in seconds, North star got you covered.",
//     name: "Jenny Wilson",
//     role: "Developer & Freelancer",
//     image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
//   },
//   {
//     text: "Working with this team transformed our digital presence completely. Their attention to detail and creative solutions exceeded all expectations. Highly recommended!",
//     name: "Michael Chen",
//     role: "Product Manager",
//     image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop"
//   },
//   {
//     text: "The level of professionalism and expertise is unmatched. They delivered our project ahead of schedule and the results speak for themselves. Absolutely fantastic!",
//     name: "Sarah Martinez",
//     role: "CEO, StartupCo",
//     image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
//   }
// ];

// const TestimonialCarousel: React.FC = () => {
//   return (
//     <Container>
//   <Title>STEPS TO USE MEZO</Title>
      
//       <CarouselWrapper>
//         <GreenBackground />
//         <GradientLeft />
//         <GradientRight />
        
//         <ScrollContainer>
//           <CardsWrapper>
//             {testimonials.map((testimonial, index) => (
//               <TestimonialCard key={index}>
//                 <StarsWrapper>
//                   {[...Array(5)].map((_, i) => (
//                     <Star key={i} size={24} fill="#FCD34D" color="#FCD34D" />
//                   ))}
//                 </StarsWrapper>
                
//                 <TestimonialText>
//                   "{testimonial.text}"
//                 </TestimonialText>
                
//                 <AuthorInfo>
//                   <Avatar src={testimonial.image} alt={testimonial.name} />
//                   <AuthorDetails>
//                     <AuthorName>{testimonial.name}</AuthorName>
//                     <AuthorRole>{testimonial.role}</AuthorRole>
//                   </AuthorDetails>
//                 </AuthorInfo>
//               </TestimonialCard>
//             ))}
//           </CardsWrapper>
//         </ScrollContainer>
//       </CarouselWrapper>
      
//       <ScrollHint>← Scroll to see more testimonials →</ScrollHint>
//     </Container>
//   );
// };

// export default TestimonialCarousel;










import React from "react";
import { CheckCircle } from "lucide-react";
import {
  Container,
  Title,
  CarouselWrapper,
  GreenBackground,
  GradientLeft,
  GradientRight,
  ScrollContainer,
  CardsWrapper,
  TestimonialCard,
  StarsWrapper,
  TestimonialText,
  AuthorInfo,
  Avatar,
  AuthorDetails,
  AuthorName,
  AuthorRole,
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
      <Title>STEPS TO USE MEZO</Title>

      <CarouselWrapper>
        <GreenBackground />
        <GradientLeft />
        <GradientRight />

        <ScrollContainer>
          <CardsWrapper>
            {steps.map((step, index) => (
              <TestimonialCard key={index}>
                <StarsWrapper>
                  <CheckCircle size={26} color="#16a34a" />
                </StarsWrapper>

                <TestimonialText>"{step.text}"</TestimonialText>

                <AuthorInfo>
                  <Avatar src={step.image} alt={step.name} />
                  <AuthorDetails>
                    <AuthorName>{step.name}</AuthorName>
                    <AuthorRole>{step.role}</AuthorRole>
                  </AuthorDetails>
                </AuthorInfo>
              </TestimonialCard>
            ))}
          </CardsWrapper>
        </ScrollContainer>
      </CarouselWrapper>

      <ScrollHint>← Scroll to see all steps →</ScrollHint>
    </Container>
  );
};

export default StepsCarousel;
