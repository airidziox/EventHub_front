import React from 'react';

const Categories = () => {
    const categories = [
        {
            name: "Music",
            path: "M8 18c0 1.1046-.89543 2-2 2s-2-.8954-2-2 .89543-2 2-2 2 .8954 2 2Zm0 0V6.33333L18 4v11.6667M8 10.3333 18 8m0 8c0 1.1046-.8954 2-2 2s-2-.8954-2-2 .8954-2 2-2 2 .8954 2 2Z"
        },
        {
            name: "Sports",
            path: "M21 12c0 4.9706-4.0294 9-9 9m9-9c0-4.97056-4.0294-9-9-9m9 9h-5m-4 9c-4.97056 0-9-4.0294-9-9m9 9v-5m-9-4c0-4.97056 4.02944-9 9-9m-9 9h5m4-9v5M8 3.93552V8m0 0v4m0-4H3.93552M8 8h4m-4 4v4m0-4h4m-4 4v4.0645M8 16H3.93552M8 16h4m0-8v4m0-4h4m-4 4v4m0-4h4m-4 4h4m0-12.06448V8m0 0v4m0-4h4.0645M16 12v4m0 0v4.0645M16 16h4.0645"
        },
        {
            name: "Conference",
            path: "M14.7141 15h4.268c.4043 0 .732-.3838.732-.8571V3.85714c0-.47338-.3277-.85714-.732-.85714H6.71411c-.55228 0-1 .44772-1 1v4m10.99999 7v-3h3v3h-3Zm-3 6H6.71411c-.55228 0-1-.4477-1-1 0-1.6569 1.34315-3 3-3h2.99999c1.6569 0 3 1.3431 3 3 0 .5523-.4477 1-1 1Zm-1-9.5c0 1.3807-1.1193 2.5-2.5 2.5s-2.49999-1.1193-2.49999-2.5S8.8334 9 10.2141 9s2.5 1.1193 2.5 2.5Z"
        },
        {
            name: "Art",
            path: "M12 7h.01m3.486 1.513h.01m-6.978 0h.01M6.99 12H7m9 4h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 3.043 12.89 9.1 9.1 0 0 0 8.2 20.1a8.62 8.62 0 0 0 3.769.9 2.013 2.013 0 0 0 2.03-2v-.857A2.036 2.036 0 0 1 16 16Z"
        },
        {
            name: "Technology",
            path: "m10.051 8.102-3.778.322-1.994 1.994a.94.94 0 0 0 .533 1.6l2.698.316m8.39 1.617-.322 3.78-1.994 1.994a.94.94 0 0 1-1.595-.533l-.4-2.652m8.166-11.174a1.366 1.366 0 0 0-1.12-1.12c-1.616-.279-4.906-.623-6.38.853-1.671 1.672-5.211 8.015-6.31 10.023a.932.932 0 0 0 .162 1.111l.828.835.833.832a.932.932 0 0 0 1.111.163c2.008-1.102 8.35-4.642 10.021-6.312 1.475-1.478 1.133-4.77.855-6.385Zm-2.961 3.722a1.88 1.88 0 1 1-3.76 0 1.88 1.88 0 0 1 3.76 0Z"
        },
        {
            name: "Festival",
            path: "M18.122 17.645a7.185 7.185 0 0 1-2.656 2.495 7.06 7.06 0 0 1-3.52.853 6.617 6.617 0 0 1-3.306-.718 6.73 6.73 0 0 1-2.54-2.266c-2.672-4.57.287-8.846.887-9.668A4.448 4.448 0 0 0 8.07 6.31 4.49 4.49 0 0 0 7.997 4c1.284.965 6.43 3.258 5.525 10.631 1.496-1.136 2.7-3.046 2.846-6.216 1.43 1.061 3.985 5.462 1.754 9.23Z"
        },
        {
            name: "Education",
            path: "M3.78552 9.5 12.7855 14l9-4.5-9-4.5-8.99998 4.5Zm0 0V17m3-6v6.2222c0 .3483 2 1.7778 5.99998 1.7778 4 0 6-1.3738 6-1.7778V11"
        },
        {
            name: "Business",
            path: "M17 8H5m12 0a1 1 0 0 1 1 1v2.6M17 8l-4-4M5 8a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.6M5 8l4-4 4 4m6 4h-4a2 2 0 1 0 0 4h4a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1Z"
        }
    ];

    return (
        <div className="flex gap-2 justify-around">
            {categories.map((category, index) => (
                <div key={index} className="group flex flex-col items-center gap-2 text-gray-800 hover:text-rose-500 dark:text-gray-200 cursor-pointer">
                    <div className="p-8 border rounded-full border-gray-300 group-hover:border-rose-300 group-hover:bg-rose-200 dark:group-hover:bg-gray-800">
                        <svg className="w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={category.path}/>
                        </svg>
                    </div>
                    <p className="CategoryText text-sm font-medium">{category.name}</p>
                </div>
            ))}
        </div>
    );
};

export default Categories;