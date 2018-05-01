import {CountryCode} from './../model/CountryCode';
import { Injectable } from '@angular/core';

@Injectable()
export class CountryCodeService {
    constructor() {}
    
    mainCountryCodes() {
        var list: CountryCode[] = [];
        list.push({
            code: '1',
            name: 'USA (+1)'
        });
        list.push({
            code: '44',
            name: 'UK (+44)'
        });
        return list;
    }
    
    countryCodes() {
        var list: CountryCode[] = []; 
        //First add the good ones
        list.push({
            code: '1',
            name: 'USA (+1)'
        });
        list.push({
            code: '44',
            name: 'UK (+44)'
        });
        
        //Then the rest
        list.push({ code: '213',name: 'Algeria (+213)'});
        list.push({ code: '376',name: 'Andorra (+376)'});
        list.push({ code: '244',name: 'Angola (+244)'});
        list.push({ code: '1264',name: 'Anguilla (+1264)'});
        list.push({ code: '1268',name: 'Antigua &amp; Barbuda (+1268)'});
        list.push({ code: '54',name: 'Argentina (+54)'});
        list.push({ code: '374',name: 'Armenia (+374)'});
        list.push({ code: '297',name: 'Aruba (+297)'});
        list.push({ code: '61',name: 'Australia (+61)'});
        list.push({ code: '43',name: 'Austria (+43)'});
        list.push({ code: '994',name: 'Azerbaijan (+994)'});
        list.push({ code: '1242',name: 'Bahamas (+1242)'});
        list.push({ code: '973',name: 'Bahrain (+973)'});
        list.push({ code: '880',name: 'Bangladesh (+880)'});
        list.push({ code: '1246',name: 'Barbados (+1246)'});
        list.push({ code: '375',name: 'Belarus (+375)'});
        list.push({ code: '32',name: 'Belgium (+32)'});
        list.push({ code: '501',name: 'Belize (+501)'});
        list.push({ code: '229',name: 'Benin (+229)'});
        list.push({ code: '1441',name: 'Bermuda (+1441)'});
        list.push({ code: '975',name: 'Bhutan (+975)'});
        list.push({ code: '591',name: 'Bolivia (+591)'});
        list.push({ code: '387',name: 'Bosnia Herzegovina (+387)'});
        list.push({ code: '267',name: 'Botswana (+267)'});
        list.push({ code: '55',name: 'Brazil (+55)'});
        list.push({ code: '673',name: 'Brunei (+673)'});
        list.push({ code: '359',name: 'Bulgaria (+359)'});
        list.push({ code: '226',name: 'Burkina Faso (+226)'});
        list.push({ code: '257',name: 'Burundi (+257)'});
        list.push({ code: '855',name: 'Cambodia (+855)'});
        list.push({ code: '237',name: 'Cameroon (+237)'});
        list.push({ code: '1',name: 'Canada (+1)'});
        list.push({ code: '238',name: 'Cape Verde Islands (+238)'});
        list.push({ code: '1345',name: 'Cayman Islands (+1345)'});
        list.push({ code: '236',name: 'Central African Republic (+236)'});
        list.push({ code: '56',name: 'Chile (+56)'});
        list.push({ code: '86',name: 'China (+86)'});
        list.push({ code: '57',name: 'Colombia (+57)'});
        list.push({ code: '269',name: 'Comoros (+269)'});
        list.push({ code: '242',name: 'Congo (+242)'});
        list.push({ code: '682',name: 'Cook Islands (+682)'});
        list.push({ code: '506',name: 'Costa Rica (+506)'});
        list.push({ code: '385',name: 'Croatia (+385)'});
        list.push({ code: '53',name: 'Cuba (+53)'});
        list.push({ code: '90392',name: 'Cyprus North (+90392)'});
        list.push({ code: '357',name: 'Cyprus South (+357)'});
        list.push({ code: '42',name: 'Czech Republic (+42)'});
        list.push({ code: '45',name: 'Denmark (+45)'});
        list.push({ code: '253',name: 'Djibouti (+253)'});
        list.push({ code: '1809',name: 'Dominica (+1809)'});
        list.push({ code: '1809',name: 'Dominican Republic (+1809)'});
        list.push({ code: '593',name: 'Ecuador (+593)'});
        list.push({ code: '20',name: 'Egypt (+20)'});
        list.push({ code: '503',name: 'El Salvador (+503)'});
        list.push({ code: '240',name: 'Equatorial Guinea (+240)'});
        list.push({ code: '291',name: 'Eritrea (+291)'});
        list.push({ code: '372',name: 'Estonia (+372)'});
        list.push({ code: '251',name: 'Ethiopia (+251)'});
        list.push({ code: '500',name: 'Falkland Islands (+500)'});
        list.push({ code: '298',name: 'Faroe Islands (+298)'});
        list.push({ code: '679',name: 'Fiji (+679)'});
        list.push({ code: '358',name: 'Finland (+358)'});
        list.push({ code: '33',name: 'France (+33)'});
        list.push({ code: '594',name: 'French Guiana (+594)'});
        list.push({ code: '689',name: 'French Polynesia (+689)'});
        list.push({ code: '241',name: 'Gabon (+241)'});
        list.push({ code: '220',name: 'Gambia (+220)'});
        list.push({ code: '7880',name: 'Georgia (+7880)'});
        list.push({ code: '49',name: 'Germany (+49)'});
        list.push({ code: '233',name: 'Ghana (+233)'});
        list.push({ code: '350',name: 'Gibraltar (+350)'});
        list.push({ code: '30',name: 'Greece (+30)'});
        list.push({ code: '299',name: 'Greenland (+299)'});
        list.push({ code: '1473',name: 'Grenada (+1473)'});
        list.push({ code: '590',name: 'Guadeloupe (+590)'});
        list.push({ code: '671',name: 'Guam (+671)'});
        list.push({ code: '502',name: 'Guatemala (+502)'});
        list.push({ code: '224',name: 'Guinea (+224)'});
        list.push({ code: '245',name: 'Guinea - Bissau (+245)'});
        list.push({ code: '592',name: 'Guyana (+592)'});
        list.push({ code: '509',name: 'Haiti (+509)'});
        list.push({ code: '504',name: 'Honduras (+504)'});
        list.push({ code: '852',name: 'Hong Kong (+852)'});
        list.push({ code: '36',name: 'Hungary (+36)'});
        list.push({ code: '354',name: 'Iceland (+354)'});
        list.push({ code: '91',name: 'India (+91)'});
        list.push({ code: '62',name: 'Indonesia (+62)'});
        list.push({ code: '98',name: 'Iran (+98)'});
        list.push({ code: '964',name: 'Iraq (+964)'});
        list.push({ code: '353',name: 'Ireland (+353)'});
        list.push({ code: '972',name: 'Israel (+972)'});
        list.push({ code: '39',name: 'Italy (+39)'});
        list.push({ code: '1876',name: 'Jamaica (+1876)'});
        list.push({ code: '81',name: 'Japan (+81)'});
        list.push({ code: '962',name: 'Jordan (+962)'});
        list.push({ code: '7',name: 'Kazakhstan (+7)'});
        list.push({ code: '254',name: 'Kenya (+254)'});
        list.push({ code: '686',name: 'Kiribati (+686)'});
        list.push({ code: '850',name: 'Korea North (+850)'});
        list.push({ code: '82',name: 'Korea South (+82)'});
        list.push({ code: '965',name: 'Kuwait (+965)'});
        list.push({ code: '996',name: 'Kyrgyzstan (+996)'});
        list.push({ code: '856',name: 'Laos (+856)'});
        list.push({ code: '371',name: 'Latvia (+371)'});
        list.push({ code: '961',name: 'Lebanon (+961)'});
        list.push({ code: '266',name: 'Lesotho (+266)'});
        list.push({ code: '231',name: 'Liberia (+231)'});
        list.push({ code: '218',name: 'Libya (+218)'});
        list.push({ code: '417',name: 'Liechtenstein (+417)'});
        list.push({ code: '370',name: 'Lithuania (+370)'});
        list.push({ code: '352',name: 'Luxembourg (+352)'});
        list.push({ code: '853',name: 'Macao (+853)'});
        list.push({ code: '389',name: 'Macedonia (+389)'});
        list.push({ code: '261',name: 'Madagascar (+261)'});
        list.push({ code: '265',name: 'Malawi (+265)'});
        list.push({ code: '60',name: 'Malaysia (+60)'});
        list.push({ code: '960',name: 'Maldives (+960)'});
        list.push({ code: '223',name: 'Mali (+223)'});
        list.push({ code: '356',name: 'Malta (+356)'});
        list.push({ code: '692',name: 'Marshall Islands (+692)'});
        list.push({ code: '596',name: 'Martinique (+596)'});
        list.push({ code: '222',name: 'Mauritania (+222)'});
        list.push({ code: '269',name: 'Mayotte (+269)'});
        list.push({ code: '52',name: 'Mexico (+52)'});
        list.push({ code: '691',name: 'Micronesia (+691)'});
        list.push({ code: '373',name: 'Moldova (+373)'});
        list.push({ code: '377',name: 'Monaco (+377)'});
        list.push({ code: '976',name: 'Mongolia (+976)'});
        list.push({ code: '1664',name: 'Montserrat (+1664)'});
        list.push({ code: '212',name: 'Morocco (+212)'});
        list.push({ code: '258',name: 'Mozambique (+258)'});
        list.push({ code: '95',name: 'Myanmar (+95)'});
        list.push({ code: '264',name: 'Namibia (+264)'});
        list.push({ code: '674',name: 'Nauru (+674)'});
        list.push({ code: '977',name: 'Nepal (+977)'});
        list.push({ code: '31',name: 'Netherlands (+31)'});
        list.push({ code: '687',name: 'New Caledonia (+687)'});
        list.push({ code: '64',name: 'New Zealand (+64)'});
        list.push({ code: '505',name: 'Nicaragua (+505)'});
        list.push({ code: '227',name: 'Niger (+227)'});
        list.push({ code: '234',name: 'Nigeria (+234)'});
        list.push({ code: '683',name: 'Niue (+683)'});
        list.push({ code: '672',name: 'Norfolk Islands (+672)'});
        list.push({ code: '670',name: 'Northern Marianas (+670)'});
        list.push({ code: '47',name: 'Norway (+47)'});
        list.push({ code: '968',name: 'Oman (+968)'});
        list.push({ code: '680',name: 'Palau (+680)'});
        list.push({ code: '507',name: 'Panama (+507)'});
        list.push({ code: '675',name: 'Papua New Guinea (+675)'});
        list.push({ code: '595',name: 'Paraguay (+595)'});
        list.push({ code: '51',name: 'Peru (+51)'});
        list.push({ code: '63',name: 'Philippines (+63)'});
        list.push({ code: '48',name: 'Poland (+48)'});
        list.push({ code: '351',name: 'Portugal (+351)'});
        list.push({ code: '1787',name: 'Puerto Rico (+1787)'});
        list.push({ code: '974',name: 'Qatar (+974)'});
        list.push({ code: '262',name: 'Reunion (+262)'});
        list.push({ code: '40',name: 'Romania (+40)'});
        list.push({ code: '7',name: 'Russia (+7)'});
        list.push({ code: '250',name: 'Rwanda (+250)'});
        list.push({ code: '378',name: 'San Marino (+378)'});
        list.push({ code: '239',name: 'Sao Tome &amp; Principe (+239)'});
        list.push({ code: '966',name: 'Saudi Arabia (+966)'});
        list.push({ code: '221',name: 'Senegal (+221)'});
        list.push({ code: '381',name: 'Serbia (+381)'});
        list.push({ code: '248',name: 'Seychelles (+248)'});
        list.push({ code: '232',name: 'Sierra Leone (+232)'});
        list.push({ code: '65',name: 'Singapore (+65)'});
        list.push({ code: '421',name: 'Slovak Republic (+421)'});
        list.push({ code: '386',name: 'Slovenia (+386)'});
        list.push({ code: '677',name: 'Solomon Islands (+677)'});
        list.push({ code: '252',name: 'Somalia (+252)'});
        list.push({ code: '27',name: 'South Africa (+27)'});
        list.push({ code: '34',name: 'Spain (+34)'});
        list.push({ code: '94',name: 'Sri Lanka (+94)'});
        list.push({ code: '290',name: 'St. Helena (+290)'});
        list.push({ code: '1869',name: 'St. Kitts (+1869)'});
        list.push({ code: '1758',name: 'St. Lucia (+1758)'});
        list.push({ code: '249',name: 'Sudan (+249)'});
        list.push({ code: '597',name: 'Suriname (+597)'});
        list.push({ code: '268',name: 'Swaziland (+268)'});
        list.push({ code: '46',name: 'Sweden (+46)'});
        list.push({ code: '41',name: 'Switzerland (+41)'});
        list.push({ code: '963',name: 'Syria (+963)'});
        list.push({ code: '886',name: 'Taiwan (+886)'});
        list.push({ code: '7',name: 'Tajikstan (+7)'});
        list.push({ code: '66',name: 'Thailand (+66)'});
        list.push({ code: '228',name: 'Togo (+228)'});
        list.push({ code: '676',name: 'Tonga (+676)'});
        list.push({ code: '1868',name: 'Trinidad &amp; Tobago (+1868)'});
        list.push({ code: '216',name: 'Tunisia (+216)'});
        list.push({ code: '90',name: 'Turkey (+90)'});
        list.push({ code: '7',name: 'Turkmenistan (+7)'});
        list.push({ code: '993',name: 'Turkmenistan (+993)'});
        list.push({ code: '1649',name: 'Turks &amp; Caicos Islands (+1649)'});
        list.push({ code: '688',name: 'Tuvalu (+688)'});
        list.push({ code: '256',name: 'Uganda (+256)'});
        list.push({ code: '380',name: 'Ukraine (+380)'});
        list.push({ code: '971',name: 'United Arab Emirates (+971)'});
        list.push({ code: '598',name: 'Uruguay (+598)'});
        list.push({ code: '7',name: 'Uzbekistan (+7)'});
        list.push({ code: '678',name: 'Vanuatu (+678)'});
        list.push({ code: '379',name: 'Vatican City (+379)'});
        list.push({ code: '58',name: 'Venezuela (+58)'});
        list.push({ code: '84',name: 'Vietnam (+84)'});
        list.push({ code: '84',name: 'Virgin Islands - British (+1284)'});
        list.push({ code: '84',name: 'Virgin Islands - US (+1340)'});
        list.push({ code: '681',name: 'Wallis &amp; Futuna (+681)'});
        list.push({ code: '969',name: 'Yemen (North)(+969)'});
        list.push({ code: '967',name: 'Yemen (South)(+967)'});
        list.push({ code: '260',name: 'Zambia (+260)'});
        list.push({ code: '263',name: 'Zimbabwe (+263)'});
        
        return list;
    }
}