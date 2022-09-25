import type {GetServerSidePropsContext, NextPage} from 'next'
import Head from 'next/head'
import {useSession, signIn, signOut} from 'next-auth/react'
import {FaDiscord, FaGithub} from 'react-icons/fa'
import {VscGithub} from 'react-icons/vsc'
import {useRouter} from 'next/router'

import {getServerAuthSession} from 'src/server/common/get-server-auth-session'
import Theme from 'src/components/theme'
import Layout from 'src/components/layout'

const Home: NextPage = () => {
	const {data: session} = useSession()
	const router = useRouter()

	return (
		<>
			<Head>
				<title>Gym Pal</title>
				<meta name='description' content='Generated by create-t3-app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className='container mx-auto flex flex-col gap-4 p-4'>
				<Layout header={<Theme />} footer={<Footer />}>
					<h1 className='text-center text-4xl font-bold'>Gym Pal</h1>
					{session ? (
						<div className='flex flex-col items-center justify-around gap-4'>
							<div className='flex flex-col gap-4'>
								<p className='mt-2 text-xl'>
									Logged in as {session?.user?.email}
								</p>
							</div>
							<div className='flex items-center gap-4'>
								<p
									className='cursor-pointer rounded border-2 border-gray-400 p-2 hover:bg-slate-500'
									onClick={() => router.push('/workout')}
								>
									Workout
								</p>
								<p
									className='cursor-pointer rounded border-2 border-gray-400 p-2 hover:bg-slate-500'
									onClick={() => router.push('/user')}
								>
									User
								</p>
								<p
									className='cursor-pointer rounded border-2 border-gray-400 p-2 hover:bg-slate-500'
									onClick={() => signOut()}
								>
									Logout
								</p>
							</div>
						</div>
					) : (
						<div>
							<div className='flex flex-col items-center justify-center'>
								<div className='text-2xl'>
									<p>Sign In </p>
								</div>

								<div className='flex justify-center'>
									<button
										onClick={() =>
											signIn('discord', {
												callbackUrl: `/`,
											})
										}
									>
										<FaDiscord className='text-8xl text-blue-400' />
									</button>
								</div>
							</div>
						</div>
					)}
				</Layout>
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

const Footer = () => {
	return (
		<>
			<h2 className='my-4 text-center text-2xl font-bold text-slate-700 dark:text-slate-200'>
				Check us out!
			</h2>
			<footer className='my-2 flex flex-col items-center justify-around gap-4 md:flex-row'>
				<div className='flex cursor-pointer flex-col items-center justify-center rounded bg-slate-300 p-2 hover:bg-slate-500 dark:bg-slate-700 dark:hover:bg-slate-600'>
					<a href='https://github.com/makyfj' target='_blank' rel='noreferrer'>
						<FaGithub className='icon' />
					</a>
					<div className='flex rounded p-1 align-top'>
						<p className='text-slate-700 dark:text-slate-200'>Franklin</p>
					</div>
				</div>

				<div className='flex cursor-pointer flex-col items-center justify-center rounded bg-slate-300 p-2 hover:bg-slate-500 dark:bg-slate-700 dark:hover:bg-slate-600'>
					<a href='https://github.com/CDDR1' target='_blank' rel='noreferrer'>
						<FaGithub className='icon' />
					</a>
					<div className='flex rounded p-1 align-top'>
						<div className='text-slate-700 dark:text-slate-200'>Carlos</div>
					</div>
				</div>
				<div className='flex cursor-pointer flex-col items-center justify-center rounded bg-slate-300 p-2 hover:bg-slate-500 dark:bg-slate-700 dark:hover:bg-slate-600'>
					<a
						href='https://github.com/KyoshiNoda'
						target='_blank'
						rel='noreferrer'
					>
						<FaGithub className='icon' />
					</a>
					<div className='flex rounded p-1 align-top'>
						<div className='text-slate-700 dark:text-slate-200'>Kyoshi</div>
					</div>
				</div>

				<div className='flex cursor-pointer flex-col items-center justify-center rounded bg-slate-300 p-2 hover:bg-slate-500 dark:bg-slate-700 dark:hover:bg-slate-600'>
					<a href='https://github.com/Keiaus' target='_blank' rel='noreferrer'>
						<FaGithub className='icon' />
					</a>
					<div className='flex rounded p-1 align-top'>
						<div className='text-slate-700 dark:text-slate-200'>Keith :D</div>
					</div>
				</div>
			</footer>
		</>
	)
}
