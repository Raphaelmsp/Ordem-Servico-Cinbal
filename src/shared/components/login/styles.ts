import styled from 'styled-components';

export const AppContainer = styled.div`
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  padding-right: 10%;
  gap: 5px;

  &:before {
    position: absolute;
    height: 1750px;
    width: 2000px;
    top: -10%;
    right: 48%;
    border-radius: 50%;
    transform: translateY(-50%);
    z-index: 0;

    content: '';
    background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);
    transition: 1.8s ease-in-out;

  }

  .image {
    width: 80%;
    height: 80%;

    transition: transform 1.1s ease-in-out;
    transition-delay: 0.4s;
  }
  .panels-container {
    position: absolute;
    height: 50%;
    width: 50%;
    top: 10px;
    left: 0px;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  .panel {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    text-align: center;
    z-index: 6;
    .content {
      color: white;
      transition: transform 0.9s ease-in-out;
      transition-delay: 0.6s;

      h3 {
        font-weight: 600;
        font-size: 1.5rem /** 24px */;
        line-height: 1;
        font-size: 1.5rem /** 24px */;
        line-height: 2rem /** 32px */;
      }

      p {
        padding-top: 0.75rem /** 12px */;
        padding-bottom: 0.75rem /** 12px */;
        padding-left: 0px;
        padding-right: 0px;
        font-size: 0.95rem;
      }
    }
  }
  .left-panel {
    pointer-events: all;
    padding: 3rem 17% 2rem 12%;
  }

  .right-panel {
    pointer-events: none;
    padding: 3rem 12% 2rem 17%;

    .image,
    .content {
      transform: translateX(800px);
    }
  }


  @media (max-height: 900px) {
    footer {
      .ouvidoria {
        display: none;
      }
    }
  }
  @media (max-height: 600px) {
    overflow: hidden;
    height: 50px;
    .ouvidoria {
      display: none;
    }
  }

  @media (max-width: 570px) {
    padding: 1.5rem;

    .image {
      display: none;
    }

    .panel {
      display: none;
    }

    h3 {
      font-size: 1.25rem /** 20px */ !important;
      line-height: 1.75rem /** 28px */ !important;
    }

    p {
      font-size: 0.875rem /** 14px */ !important;
      line-height: 1.25rem /** 20px */ !important;
    }

    &:before {
      display: none;
    }
  }

  @media (max-width: 870px) {
    min-height: 800px;
    height: 100vh;
    padding: 1.5rem;

    .image {
      display: none;
    }

    .panel {
      display: none;
    }

    h3 {
      font-size: 1.25rem /** 20px */ !important;
      line-height: 1.75rem /** 28px */ !important;
    }

    p {
      font-size: 0.875rem /** 14px */ !important;
      line-height: 1.25rem /** 20px */ !important;
    }

    &:before {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    .image {
      display: none;
    }
    .panels-container {
      display: grid;
      grid-template-columns: 1fr;
    }
    .panel .content {
      display: none;
    }
    .left-panel {
      display: none;
      width: 100%;
    }
    h3 {
      font-size: 1.25rem /** 20px */ !important;
      line-height: 1.75rem /** 28px */ !important;
    }
    p {
      font-size: 0.875rem /** 14px */ !important;
      line-height: 1.25rem /** 20px */ !important;
    }
    &:before {
      display: none;
    }
    
  } 
  @media only screen and (max-width:1024px){
        align-items: center;
        margin: auto;
  }
`;
