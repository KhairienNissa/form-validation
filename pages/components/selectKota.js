import React from 'react';
import Select from 'react-select';
import {Kota}  from '../datadummy.js/kota';

const SelectKota = ({field, form }) => {
 

   
   const options = [
    {
        value: 1,
       label : "Banda Aceh"
    },
    {
        value: 2,
       label : "Denpasar"
    },
    {
        value: 3,
       label : "Pangkal Pinang"
    },
    {
        value: 4,
       label : "Serang"
    },
    {
        value: 5,
       label : "Tangerang"
    },
    {
        value: 6,
       label : "Bengkulu"
    },
    {
        value: 7,
       label : "Yogyakarta"
    },
    {
        value: 8,
       label : "Gorontalo"
    },
    {
        value: 9,
       label : "	Jambi"
    },
    {
        value: 10,
       label : "	Bandung"
    },
    {
        value: 11,
       label : "Bekasi"
    },
    {
        value: 12,
       label : "Depok"
    },
    {
        value: 13,
       label : "Kediri"
    },
    {
        value: 14,
       label : "Malang"
    },
    {
        value: 15,
       label : "Surabaya"
    },
    {
        value: 16,
       label : "Samarinda"
    },
    {
        value: 17,
       label : "	Sorong"
    },
    {
        value: 18,
       label : "Padang"
    },
    {
        value: 19,
       label : "Palu"
    },
    {
        value: 20,
       label : "Bukittinggi"
    }
]

    //  const handleChange = (value) => {
    //     setKotaId(value.value)
    //   }

    return (
        <div className='text-black'>
           <Select placeholder="Pilih Kota"
           onChange={({ value }) => form.setFieldValue(field.name, value)}
          
            options={options} />
        </div>
    );
};

export default SelectKota