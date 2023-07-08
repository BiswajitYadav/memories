import React from 'react'
import Header from '../components/Header'
import SideBarNav from '../components/SideBarNav'

const TermsAndCondition = () => {
    return (
        <>
            <div className='bg-[#D9D9D9] dark:bg-slate-900 h-screen w-full'>
                <Header />
                <div className='bg-[#D9D9D9] dark:bg-[#1C1132] overflow-y-auto h-max lg:h-[92vh] w-full flex justify-between gap-x-5 py-3 px-2 sm:px-5 md:px-9 md:py-5 lg:px-5 xl:px-16'>
                    <div className='bg-white dark:bg-[#231344] dark:shadow-black rounded-xl w-full flex shadow-lg pr-1'>
                        <SideBarNav />
                        <div className='h-[80vh] overflow-y-auto w-full p-3 md:p-8 xl:p-10 dark:text-white'>
                            <div className='text-lg font-semibold'>Welcome to Memories! By accessing and using our website, you agree to be bound by the following terms and conditions:</div>
                            <div className='font-semibold py-1 text-lg'>1. User Conduct</div>
                            <div className='list-disc pl-6'>
                                <li>You agree to use the website only for lawful purposes and in a manner
                                    consistent with all applicable laws and regulations.</li>
                                <li>You agree not to use the website in any way that infringes any intellectual
                                    property rights or violates the privacy, publicity, or other rights of any third
                                    party.</li>
                                <li>You agree not to use the website in any way that could damage, disable,
                                    overburden, or impair the website or interfere with any other party's use of
                                    the website.</li>
                                <li>You agree not to use any automated system or software to extract data from
                                    the website without our prior written consent.</li>
                            </div>
                            <div className='font-semibold py-1 text-lg'>2. Content</div>
                            <div className='list-disc pl-6'>
                                <li>You agree that any content you post, upload, or otherwise submit to the
                                    website (including but not limited to text, images, videos, and audio) is your
                                    own original work or that you have obtained all necessary rights and
                                    permissions from the owner of the content.</li>
                                <li>You grant us a non-exclusive, royalty-free, worldwide license to use,
                                    reproduce, distribute, and display your content on the website and in any
                                    other medium or format now known or hereafter developed.</li>
                                <li>You agree that we may remove or disable access to any content that violates
                                    these terms and conditions or that we believe is unlawful or harmful to our
                                    users or third parties.
                                </li>
                            </div>
                            <div className='font-semibold py-1 text-lg'>3. Privacy</div>
                            <div className='list-disc pl-6'>
                                <li>We take your privacy seriously and will handle your personal information in
                                    accordance with our Privacy Policy, which is available on our website.</li>
                                <li>By using the website, you agree to our collection, use, and disclosure of your
                                    personal information as described in the Privacy Policy.</li>
                            </div>
                            <div className='font-semibold py-1 text-lg'>4. Intellectual Property</div>
                            <div className='list-disc pl-6'>
                                <li>The website and all content on the website (including but not limited to text,
                                    images, videos, and audio) are our property or the property of our licensors
                                    and are protected by copyright, trademark, and other intellectual property
                                    laws.</li>
                                <li>You agree not to use any content from the website for commercial purposes
                                    without our prior written consent.</li>
                            </div>
                            <div className='font-semibold py-1 text-lg'>5. Disclaimers</div>
                            <div className='list-disc pl-6'>
                                <li>We make no representations or warranties of any kind, express or implied,
                                    regarding the website or the content on the website.</li>
                                <li>We do not guarantee that the website will be error-free, uninterrupted, or free
                                    of viruses or other harmful components.</li>
                                <li>We are not responsible for any third-party content or links on the website.
                                </li>
                            </div>
                            <div className='font-semibold py-1 text-lg'>6. Limitation of Liability</div>
                            <div className='list-disc pl-6'>
                                <li>We are not liable for any damages arising from your use of the website or
                                    your reliance on any content on the website, including but not limited to
                                    direct, indirect, incidental, punitive, and consequential damages.</li>
                                <li>In no event shall our liability to you exceed the amount you have paid us, if
                                    any, to use the website.
                                </li>
                            </div>
                            <div className='font-semibold py-1 text-lg'>7. Indemnification</div>
                            <div className='list-disc pl-6'>
                                <li>You agree to indemnify and hold us harmless from any claims, damages,
                                    liabilities, and expenses (including attorney's fees) arising from your use of the
                                    website or your breach of these terms and conditions.
                                </li>
                            </div>
                            <div className='font-semibold py-1 text-lg'>8. Governing Law and Dispute Resolution</div>
                            <div className='list-disc pl-6'>
                                <li>These terms and conditions shall be governed by and construed in accordance
                                    with the laws of [insert governing law].
                                </li>
                                <li>Any dispute arising from or relating to these terms and conditions shall be
                                    resolved through arbitration in accordance with the rules of [insert arbitration
                                    organization].
                                </li>
                            </div>
                            <div className='font-semibold py-1 text-lg'>9. Modification and Termination</div>
                            <div className='list-disc pl-6'>
                                <li>We may modify or terminate these terms and conditions at any time, in our sole discretion.
                                </li>
                                <li>If you do not agree with any changes to these terms and conditions, you must stop using the website.
                                </li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TermsAndCondition