export default function AuthIndex() {
  return <p>Redirecting...</p>
}

export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: '/auth/login',
      permanent: false,
    },
  }
}
