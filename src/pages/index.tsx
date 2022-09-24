import type {GetServerSidePropsContext, NextPage} from 'next'
import Head from 'next/head'
import {useSession, signIn, signOut} from 'next-auth/react'

import {getServerAuthSession} from 'src/server/common/get-server-auth-session'
import Theme from 'src/components/theme'

const Home: NextPage = () => {
	const {data: session} = useSession()

	return (
		<>
			<Head>
				<title>Gym Pal</title>
				<meta name='description' content='Generated by create-t3-app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='container mx-auto p-4'>
				<Theme />
				<h1 className='text-center text-4xl font-bold'>Hello Gym Pal</h1>
				{session ? (
					<div>
						<p>Logged in as {session?.user?.email}</p>
						<button
							onClick={() => signOut()}
							className='rounded border border-black p-4'
						>
							Logout
						</button>
					</div>
				) : (
					<div>
						<p>Not signed in</p>
						<button
							onClick={() =>
								signIn('discord', {
									callbackUrl: `/`,
								})
							}
							className='rounded border border-black p-4'
						>
							Discord
						</button>
					</div>
				)}
			</main>
		</>
	)
}

export default Home

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	return {
		props: {
			session: await getServerAuthSession(ctx),
		},
	}
}
