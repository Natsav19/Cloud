"use client";
import React, { useEffect, useState } from 'react';
import Edit from './edit';
import UserContext from './UserContext';

export default function Home({ params }) {
    return (
        <>
            <UserContext.Provider value={params.id}>
                <Edit></Edit>
            </UserContext.Provider>
        </>
    )
}
