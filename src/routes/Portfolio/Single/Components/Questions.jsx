"use client";

import React from 'react';
import classNames from 'clsx';
import { useQuery } from 'react-query';
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi';
import { requestApi } from '../../../../utils/wordpress';
import { Rect } from '../../../../components/General';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../../../components/ui/accordion';

// ⬇️ define your query
const questionsQuery = (slug, include = []) => ({
    queryKey: ['portfolio', 'questions', slug],
    queryFn: async () => {
        const { data = [] } = await requestApi.get(`wp/v2/q_and_a/?include=${include.join(',')}`);

        return data;
    },
});

const ContentLoaderRender = ({ amount = 2 }) => (
    <div className="space-y-[1px]">
        {[...amount].map((_, index) => (<Rect key={index} className="rounded-none w-full h-12" />))}
    </div>
);

const Accordions = ({ items, ...props }) => {
    return (
        <Accordion type="single" collapsible className="accordion w-full" {...{ ...props }}  >
            {items.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index} as="div" className="accordion__item border border-slate-200">
                    <AccordionTrigger className={classNames('accordion__toggle text-left text-sm md:text-base flex items-center justify-between w-full px-4 py-3 focus:bg-gray-100 focus:outline-none focus:ring focus:ring-opacity-75', {
                        'text-slate-900': true,
                    })}>
                        {item.title?.rendered}
                    </AccordionTrigger>
                    <AccordionContent className="accordion__panel p-4 text-sm leading-relaxed text-zinc-600 border-t border-slate-200 origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0">
                        <div dangerouslySetInnerHTML={{ __html: item.content?.rendered }} />
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

const Component = (props) => {
    const { acf: { meta: { questions: include = [] } = {} } = {}, slug } = props;

    const { data = false, isLoading } = useQuery(questionsQuery(slug, include));

    return (
        <div className="portfolio-questions lg:sticky lg:top-[80px] grow-0">
            <h3 className="text-lg text-blue-500">
                <HiOutlineQuestionMarkCircle className="inline-block size-6 me-2" />
                <span>Intrebări frecvente</span>
            </h3>
            <div className="border-b border-slate-200 my-5" />
            {isLoading ? <ContentLoaderRender amount={include} /> : (data) ? <Accordions items={data} /> : <div>Fără întrebări</div>}
        </div>
    );
};

export default Component;
