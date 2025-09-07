import { serialize } from 'cookie';

export async function getServerSideProps({ res }) {
  
  res.setHeader('Set-Cookie', serialize('session', '', {
    httpOnly: true,
    secure: false,
    expires: new Date(0),
    path: '/',
  }));

  
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
}

export default function Logout() {
  
  return null;
}
