import React from 'react';
import { getOxygen } from '@lib/api';
import { statePaths, humanize } from '@lib/utils';
import EntityCard from '@components/EntityCard';
import Breadcumb from '@components/Breadcumb';
import { NextSeo } from 'next-seo';

export default function Oxygen({ state, district, oxygenListing }) {
    const SEO = {
        title: `Oxygen in ${humanize(district)} , ${humanize(state)}`,
        description: `Covid19 Resources for Oxygen in ${humanize(district)} , ${humanize(state)}`,
        openGraph: {
            title: `Oxygen in ${humanize(district)} , ${humanize(state)}`,
            description: `Covid19 Resources for Oxygen in ${humanize(district)} , ${humanize(
                state
            )}`
        },
        additionalMetaTags: [
            {
                property: 'keywords',
                content: `covid19,india,resources,coronasafe,swasth alliance,covidfyi,${humanize(
                    district
                )},${humanize(state)},oxygen`
            }
        ]
    };
    return (
        <div className="pt-10">
            <NextSeo {...SEO} />
            <section className="flex flex-col ml-2 md:pt-10">
                <Breadcumb
                    list={[
                        { href: `/${state}`, name: humanize(state) },
                        { href: `/${state}/${district}`, name: humanize(district) },
                        { href: null, name: 'Oxygen' }
                    ]}
                />
            </section>
            <section className="flex flex-col items-center">
                <h1 className="mt-4 font-black text-6xl text-gray-900 dark:text-gray-200 md:text-left text-center">
                    {humanize(district)}
                </h1>
                <div className="w-full mt-4 p-4 space-y-4">
                    {oxygenListing.map((o) => {
                        return (
                            <EntityCard
                                key={o.id}
                                id={o.id}
                                name={o.name}
                                company={o.companyName}
                                phone1={o.phone1}
                                phone2={o.phone2}
                                description={o.description}
                                source={o.sourceName}
                                sourceLink={o.sourceLink}
                                state={state}
                                district={district}
                                createdTime={o.createdTime}
                                verificationStatus={o.verificationStatus}
                                lastVerifiedOn={o.lastVerifiedOn}
                            />
                        );
                    })}
                </div>
            </section>
        </div>
    );
}

export async function getStaticProps({ params }) {
    return {
        props: {
            state: params.state,
            district: params.district,
            oxygenListing: getOxygen(params.state, params.district, true)
        }
    };
}

export async function getStaticPaths() {
    return {
        paths: statePaths('oxygen'),
        fallback: false
    };
}
