import PropTypes from 'prop-types'
import Head from 'next/head'
import Footer from '../footer'
import Header from '../header'
const SharedLayout = ({ children, title, className = '', footer = true }) => {
  return (
    <div className="min-h-screen ">
      <Head>
        <title>HealthHub | {title}</title>
      </Head>
      <div className="flex flex-row">
        <div className={`flex flex-1 flex-col `}>
          <Header />
          <main className={`${className} relative`}>{children}</main>
          {footer && <Footer />}
        </div>
      </div>
    </div>
  )
}

SharedLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
}

export default SharedLayout
