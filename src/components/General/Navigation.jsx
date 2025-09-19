import React from 'react';
import classNames from 'clsx';
import { NavLink, useLoaderData } from 'react-router';

const Navigation = ({ className = '', menuID, classes = {}, ...props }) => {
    const { menus = [] } = useLoaderData();
    
    const { items = [] } = menus.filter(({ ID }) => ID === menuID).pop() || {};

    const { list, link: linkClasses } = classes;

    return (
        <nav className={classNames('wp-block-navigation', ...[className ? className.split(' ') : []])} {...{ ...props }} id={`wp-navigation-${menuID}`}>
            <ul className={classNames('wp-block-navigation__container', ...[list ? list.split(' ') : ['flex']])}>
                {items.map(({ children = [], classes, url = '#', title }, index) => {
                    return (
                        <li key={index} className={classNames('wp-block-navigation-item', {
                            'wp-block-navigation-item--has-dropdown': children.length > 0,
                            ...[classes ? classes.split(' ') : []],
                        })}>
                            <NavLink {...{
                                'className': classNames(
                                    'wp-block-navigation-item__content',
                                    ...[linkClasses ? linkClasses.split(' ') : []],
                                    { 'dropdown-toggle': children.length > 0 }
                                ),
                                'to': url,
                                'aria-expanded': children.length ? 'false' : null,
                                'role': children.length > 0 ? 'button' : null,
                            }}>{title}</NavLink>
                            {children.length > 0 && (
                                <ul className="wp-block-navigation-item__dropdown">
                                    {children.map(item => {
                                        const classes = classNames('dropdown-item', ...[item.classes ? item.classes.split(' ') : []]);
                                        return (
                                            <li key={item.id}>
                                                <NavLink exact className={classes} to={item.url}>{item.title}</NavLink>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default Navigation;