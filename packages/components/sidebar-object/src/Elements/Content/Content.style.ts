import styled from 'styled-components';


export const ContentWrapper = styled.div`
padding: 12px 140px 12px 0;
border-bottom: 1px dashed ${(props): string =>props.theme.palette['grey-300']};
margin: 0 24px;
`;

export const TagsWrapper = styled.div`
padding: 22px 0 0;
border-bottom: 1px dashed ${(props): string =>props.theme.palette['grey-300']};
margin: 0 24px;
`;
export const InlineEditWrapper = styled.div`
padding: 12px 0;
margin: 0 24px;
#descriptioninput{
color: ${(props): string =>props.theme.palette['grey-400']};
}
.ds-inline-edit > div:nth-child(2){
background-color: ${(props): string =>props.theme.palette.white};

}
`;
export const DrawerContent = styled.div`
  padding: 0px;
`;
