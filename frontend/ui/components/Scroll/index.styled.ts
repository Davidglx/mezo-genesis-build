// // importing styled from styled components




// import styled from 'styled-components';


// import { createGlobalStyle } from 'styled-components';

// export const LocalFonts = createGlobalStyle`
//   @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Prata&family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap');
// `;

// // scroll container
// export const ScrollContainer = styled.div`
//     z-index: 10;
//     display: flex;
//     margin-top: -22px;
//     height: 24px;
//     width: 100vw;
//     flex-direction: row;
//     overflow: hidden;
//     white-space: nowrap;
//     position: relative;
//     margin-left: -29px;

//     .overlay::before, .overlay::after {
//         background: unset !important;
//     }
// `

// export const ScrollTextHolder = styled.div`
//    margin-top: -10px;
//    display: flex;
//    flex-direction: row;
// `



// export const ScrollText = styled.p`
// //    width: 10%;
//    font-size: 0.8rem;
//    font-weight: 800;
//    word-spacing: 4px;
//    text-transform : uppercase;
//    gap: 1rem;
//    display: flex;
//    flex-direction: row;
//    padding : 0px 30px;
//    font-family: ${({ theme }) => theme.fonts.Inter};
//    color : black 

//    span:nth-child(2) {
//     font-size: 0.6rem;
//    }
//    @media screen and (max-width: 400px) {
//        font-size: 12px;
//        span:nth-child(2) {
//         font-size: 9px;
//        }
//    }

// `



import styled, { createGlobalStyle } from 'styled-components';

export const LocalFonts = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
`;

/* Scroll container */
export const ScrollContainer = styled.div`
  z-index: 10;
  display: flex;
  margin-top: -22px;
  height: 24px;
  width: 100vw;
  flex-direction: row;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  margin-left: -29px;

  .overlay::before, .overlay::after {
    background: unset !important;
  }
`;

export const ScrollTextHolder = styled.div`
  margin-top: -10px;
  display: flex;
  flex-direction: row;
`;

export const ScrollText = styled.p`
  font-size: 0.8rem;
  font-weight: 800;
  word-spacing: 4px;
  text-transform: uppercase;
  gap: 1rem;
  display: flex;
  flex-direction: row;
  padding: 0px 30px;
  
  /* ✅ Use the Outfit font you just imported */
  font-family: 'Outfit', sans-serif;
  color: black;

  span:nth-child(2) {
    font-size: 0.6rem;
  }

  @media screen and (max-width: 400px) {
    font-size: 12px;
    span:nth-child(2) {
      font-size: 9px;
    }
  }
`;
