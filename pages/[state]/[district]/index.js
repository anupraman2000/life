import React from 'react';
import { statePaths, parametreize, humanize, activeDistricts } from '@lib/utils';
import TabLinks from '@components/TabLinks';
import Breadcumb from '@components/Breadcumb';
import SocialSharing from '@components/SocialSharing';
import { tabsInfo } from '@lib/tabs';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import useLocale from '@hooks/use-locale';
import { useLocaleContext } from '@hooks/use-locale-context';

export default function State({ state, district }) {
    const { locale } = useLocaleContext();
    const th = useLocale(locale).state;
    const { asPath } = useRouter();
    const pageUrl = `https://liferesources.in${asPath}`;
    const SEO = {
        title: `${humanize(district.district)} , ${humanize(state)} | Coronasafe network`,
        description: `Covid19 Resources for ${humanize(district.district)} , ${humanize(state)} `,
        openGraph: {
            title: `${humanize(district.district)} , ${humanize(state)} | Coronasafe network`,
            description: `Covid19 Resources for ${humanize(district.district)} , ${humanize(
                state
            )} `
        },
        additionalMetaTags: [
            {
                property: 'keywords',
                content: `covid19,india,resources,coronasafe,swasth alliance,covidfyi,${humanize(
                    district.district
                )},hospital,ambulance,helpline,oxygen,medicine`
            }
        ]
    };
    return (
        <section className="pt-10">
            <NextSeo {...SEO} />
            <Breadcumb
                list={[
                    { href: `/${state}`, name: humanize(state) },
                    { href: null, name: humanize(district.district) }
                ]}
            />
            <div className="w-full flex items-center pt-2">
                <div className="mr-auto">
                    <SocialSharing
                        shareText={th.share}
                        url={pageUrl}
                        twitterText={`Covid-19 Resources for ${humanize(
                            district.district
                        )}, ${humanize(state)} ${pageUrl}`}
                    />
                </div>
            </div>
            <div className="w-full mt-2 px-2">
                <div className="w-full text-center">
                    <div className="mt-4 font-black text-5xl text-gray-900 dark:text-gray-200 py-4">
                        {humanize(district.district)}
                        <span className="text-3xl font-semibold text-gray-700 dark:text-gray-200">
                            {' '}
                            , {humanize(state)}
                        </span>
                    </div>
                </div>
                <section className="flex justify-center">
                    <div className="my-8 bg-gray-200 dark:bg-gray-1200 rounded-md inline-block">
                        <TabLinks tabsInfo={tabsInfo} state={state} district={district} />
                    </div>
                </section>
            </div>
        </section>
    );
}

export async function getStaticProps({ params }) {
    return {
        props: {
            state: params.state,
            district: activeDistricts().find(
                ({ district, state }) =>
                    parametreize(state) === params.state &&
                    parametreize(district) === params.district
            )
        }
    };
}

export async function getStaticPaths() {
    return {
        paths: statePaths('all'),
        fallback: false
    };
}
