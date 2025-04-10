export const GET_ALL_COMPANIES_QUERY = `
  query {
    companies {
    id
    companyName
    companyShortName
    dateOfEstablishment
    countryOfIncorporation
    registrationNumber
    gst
    alternateContactNumber
    landlineNumber
    websiteUrl
    createdDate
    modifiedDate
    emailId
    businessPanCard
    accountStatus
    address
    }
  }
`;

export const GET_COMPANY_BY_ID_QUERY = `
  query($id: ID!) {
    company(id: $id) {
    id
    companyName
    companyShortName
    dateOfEstablishment
    countryOfIncorporation
    registrationNumber
    gst
    alternateContactNumber
    landlineNumber
    websiteUrl
    createdDate
    modifiedDate
    emailId
    businessPanCard
    accountStatus
    address
    }
  }
`;
