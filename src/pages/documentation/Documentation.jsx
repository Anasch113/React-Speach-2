import DocSidebar from '@/components/documentations/DocSidebar'
import DocumentationLayout from '@/components/documentations/DocumentationLayout'
import ApiInfo from '@/components/documentations/sections/ApiInfo'
import CoverPage from '@/components/documentations/sections/CoverPage'
import DataBaseInfo from '@/components/documentations/sections/DataBaseInfo'
import FaqsAndTroubleShot from '@/components/documentations/sections/FaqsAndTroubleShot'
import FeaturesAndFunction from '@/components/documentations/sections/FeaturesAndFunction'
import GettingStarted from '@/components/documentations/sections/GettingStarted'
import Introduction from '@/components/documentations/sections/Introduction'
import SupportInfo from '@/components/documentations/sections/SupportInfo'
import UserInterfaceOverview from '@/components/documentations/sections/UserInterfaceOverview'
import React from 'react'
import Markdown from 'react-markdown'
import { Element } from 'react-scroll'

const Documentation = () => {

  const markdown = 'This is **bold** *italic*'
  return (
    <DocumentationLayout >

      <Element name='cover-page'><CoverPage /></Element>
      <Element name='introduction'><Introduction /></Element>
      <Element name='getting-started'><GettingStarted /></Element>
      <Element name='database-info'><DataBaseInfo /></Element>
      <Element name='api-info'> <ApiInfo /></Element>
      <Element name='userinterface-overview'> <UserInterfaceOverview /></Element>
      <Element name='features'> <FeaturesAndFunction /></Element>
      <Element name='faqs'><FaqsAndTroubleShot /></Element>
      <Element name='support'><SupportInfo /></Element>

    </DocumentationLayout>
  )
}

export default Documentation
