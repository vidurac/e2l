(function() {'use strict';
    angularEarnToLearnServices.factory('GiftcardService', ['$http', '$state', '$resource', '$cookieStore', '$rootScope', '$localStorage', '_URLS', 'AUTH_EVENTS','$q','$filter', function ($http, $state, $resource, $cookieStore, $rootScope, $localStorage, _URLS, AUTH_EVENTS,$q,$filter) {
        
        // Get All Gift Cards
        function GetAllGiftCards() {
            return $resource(_URLS.BASE_API + 'homegiftcard' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

         // Get All Gift Cards
        function GetAllGiftCardsFromAdmin() {
            return $resource(_URLS.BASE_API + 'homegiftcard/getAllGiftCards' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get House Assigned Gift Cards
        function GetHouseAssignedGiftCards(id) {
            return $resource(_URLS.BASE_API + 'homegiftcard/by_house/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        function GetHouseGiftCards(id) {
            return $resource(_URLS.BASE_API + 'homegiftcard/getGiftCardByHouse/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Get Child Assigned Gift Cards
        function GetChildAssignedGiftCards(child_id) {
            return $resource(_URLS.BASE_API + 'homegiftcard/getHouseGiftCardByChild/' + child_id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Assign Gift Card To House
        function AssignGiftCardToHouse(giftCard){
            return $resource(_URLS.BASE_API + 'homegiftcard' + _URLS.TOKEN_API + $localStorage.token, {
                card_id     : giftCard.Id,
                house_id    : giftCard.houseId,
                points      : giftCard.value,
                child_id    : JSON.stringify(giftCard.child_id),
                enable      : 1
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }

        // Assign Gift Card To House by Sponsor
        function AssignGiftCardToHouseBySponsor(giftCard){
            return $resource(_URLS.BASE_API + 'homegiftcard' + _URLS.TOKEN_API + $localStorage.token, {
                card_id     : giftCard.Id,
                house_id    : giftCard.houseId,
                points      : giftCard.value,
                child_id    : JSON.stringify(giftCard.child_id),
                enable      : 1,
                sponsor_id  : giftCard.sponsorId
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }

        // Child Request Gift Card
        function ChildRequestGiftCard(giftCard) {
            return $resource(_URLS.BASE_API + 'childgiftcard' + _URLS.TOKEN_API + $localStorage.token, giftCard, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }
        
        // Load current requested cards
        function LoadCardRequests(id) {
            return $resource(_URLS.BASE_API + 'childgiftcard/by_house/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Load current requested cards
        function LoadChildGiftCardRequestsFromSponsor() {
            return $resource(_URLS.BASE_API + 'childgiftcard/by_sponsor' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Reject Gift Card
        function RejectGiftCard(giftCard){
            // return $resource(_URLS.BASE_API + 'childgiftcard/reject/' + giftCard.child_card_id + _URLS.TOKEN_API + $localStorage.token, {
            //     housecard_id    : giftCard.housecard_id,
            //     house_id        : giftCard.house_id,
            //     child_id        : giftCard.child_id,
            //     enable          : 0,
            //     _method         : 'PATCH'
            // }, {
            //     fetch: 'JSONP',
            //     'query': {
            //         method: 'POST',
            //         isArray: false
            //     }
            // }).query().$promise;
            return $http.post(_URLS.BASE_API + 'childgiftcard/reject/' + giftCard.child_card_id + _URLS.TOKEN_API + $localStorage.token,
                {
                    housecard_id    : giftCard.housecard_id,
                    house_id        : giftCard.house_id,
                    child_id        : giftCard.child_id,
                    enable          : 0,
                }
            )
        }
        
        // Update card of the house
        function UpdateHouseAssignCard(giftCard){
            return $resource(_URLS.BASE_API + 'homegiftcard/' + giftCard.card_id + _URLS.TOKEN_API + $localStorage.token, {
                card_id     : giftCard.Id,
                house_id    : giftCard.card_house_id,
                points      : giftCard.card_points,
                enable      : giftCard.card_enable,
                child_id    : giftCard.child_id,
                _method     : 'PATCH'
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }
        
        // Get Gift cards By Child Id
        function GetGiftcardsByChildId(id) {
             return $resource(_URLS.BASE_API + 'childgiftcard/by_child/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get Gift cards By Child Id
        function GetHouseGiftCardByChild(id) {
             return $resource(_URLS.BASE_API + 'homegiftcard/getHouseGiftCardByChild/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get Gift cards details with user details By child gift card Id
        function GetChaildGiftCardByChildGiftCard(id) {
             return $resource(_URLS.BASE_API + 'giftcard/getChaildGiftCardByChildGiftCard/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Checks whether child can request gift card from sponsor
        function CanChildRequestGiftCardFromSponsor(sid, points) {
             return $resource(_URLS.BASE_API + 'can-child-request-sponsor-gift-cards/' + sid + '/' + points + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }


        // check gift card point is available for request giftcard
        function IsAvailablePonintForRequest(childId, points) {
             return $resource(_URLS.BASE_API + 'giftcard/isAvailablePonintForRequest/' + childId + '/' + points + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }


        // purchase a gift card
        function PurchaseGiftCard(card_id , giftCard) {
            return $resource(_URLS.BASE_API + 'giftcard/purchaseGiftCard/'+card_id+ _URLS.TOKEN_API + $localStorage.token, {
                child_giftcard_id: card_id,
                deliver_email       : giftCard.recipientEmail,
                deliver_fname       : giftCard.recipientFName,
                deliver_lname       : giftCard.recipientLName,
                purchaser_email     : giftCard.purchaserEmail,
                purchaser_fname     : giftCard.purchaserFName,
                purchaser_lname     : giftCard.purchaserLName,
                purchaser_city      : giftCard.purchaserCity,
                purchaser_address   : giftCard.purchaserAddress,
                purchaser_state     : giftCard.purchaserState,
                purchaser_country   : giftCard.purchaserCountry,
                purchaser_phone     : giftCard.purchaserPhone,
                purchaser_zipcode   : giftCard.purchaserZipCode,
                ccNumber            : giftCard.cardNumber,
                ccCvs               : giftCard.cardCvc,
                ccExpairYear        : giftCard.cardExpirYear,
                ccExpairMonth       : giftCard.cardExpirMonth,
                cardType            : giftCard.cardType,
                _method             : "POST"
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }


        function GetCountryList() {
            return [
             {name: 'United States', code: 'US'},
             {name: 'United Kingdom', code: 'GB'},
             {name: 'United Arab Emirates', code: 'AE'},
             {name: 'United States Minor Outlying Islands', code: 'UM'},
             {name: 'Afghanistan', code: 'AF'},
             {name: 'Aland Islands', code: 'AX'},
             {name: 'Albania', code: 'AL'},
             {name: 'Algeria', code: 'DZ'},
             {name: 'American Samoa', code: 'AS'},
             {name: 'AndorrA', code: 'AD'},
             {name: 'Angola', code: 'AO'},
             {name: 'Anguilla', code: 'AI'},
             {name: 'Antarctica', code: 'AQ'},
             {name: 'Antigua and Barbuda', code: 'AG'},
             {name: 'Argentina', code: 'AR'},
             {name: 'Armenia', code: 'AM'},
             {name: 'Aruba', code: 'AW'},
             {name: 'Australia', code: 'AU'},
             {name: 'Austria', code: 'AT'},
             {name: 'Azerbaijan', code: 'AZ'},
             {name: 'Bahamas', code: 'BS'},
             {name: 'Bahrain', code: 'BH'},
             {name: 'Bangladesh', code: 'BD'},
             {name: 'Barbados', code: 'BB'},
             {name: 'Belarus', code: 'BY'},
             {name: 'Belgium', code: 'BE'},
             {name: 'Belize', code: 'BZ'},
             {name: 'Benin', code: 'BJ'},
             {name: 'Bermuda', code: 'BM'},
             {name: 'Bhutan', code: 'BT'},
             {name: 'Bolivia', code: 'BO'},
             {name: 'Bosnia and Herzegovina', code: 'BA'},
             {name: 'Botswana', code: 'BW'},
             {name: 'Bouvet Island', code: 'BV'},
             {name: 'Brazil', code: 'BR'},
             {name: 'British Indian Ocean Territory', code: 'IO'},
             {name: 'Brunei Darussalam', code: 'BN'},
             {name: 'Bulgaria', code: 'BG'},
             {name: 'Burkina Faso', code: 'BF'},
             {name: 'Burundi', code: 'BI'},
             {name: 'Cambodia', code: 'KH'},
             {name: 'Cameroon', code: 'CM'},
             {name: 'Canada', code: 'CA'},
             {name: 'Cape Verde', code: 'CV'},
             {name: 'Cayman Islands', code: 'KY'},
             {name: 'Central African Republic', code: 'CF'},
             {name: 'Chad', code: 'TD'},
             {name: 'Chile', code: 'CL'},
             {name: 'China', code: 'CN'},
             {name: 'Christmas Island', code: 'CX'},
             {name: 'Cocos (Keeling) Islands', code: 'CC'},
             {name: 'Colombia', code: 'CO'},
             {name: 'Comoros', code: 'KM'},
             {name: 'Congo', code: 'CG'},
             {name: 'Congo, The Democratic Republic of the', code: 'CD'},
             {name: 'Cook Islands', code: 'CK'},
             {name: 'Costa Rica', code: 'CR'},
             {name: 'Cote D\'Ivoire', code: 'CI'},
             {name: 'Croatia', code: 'HR'},
             {name: 'Cuba', code: 'CU'},
             {name: 'Cyprus', code: 'CY'},
             {name: 'Czech Republic', code: 'CZ'},
             {name: 'Denmark', code: 'DK'},
             {name: 'Djibouti', code: 'DJ'},
             {name: 'Dominica', code: 'DM'},
             {name: 'Dominican Republic', code: 'DO'},
             {name: 'Ecuador', code: 'EC'},
             {name: 'Egypt', code: 'EG'},
             {name: 'El Salvador', code: 'SV'},
             {name: 'Equatorial Guinea', code: 'GQ'},
             {name: 'Eritrea', code: 'ER'},
             {name: 'Estonia', code: 'EE'},
             {name: 'Ethiopia', code: 'ET'},
             {name: 'Falkland Islands (Malvinas)', code: 'FK'},
             {name: 'Faroe Islands', code: 'FO'},
             {name: 'Fiji', code: 'FJ'},
             {name: 'Finland', code: 'FI'},
             {name: 'France', code: 'FR'},
             {name: 'French Guiana', code: 'GF'},
             {name: 'French Polynesia', code: 'PF'},
             {name: 'French Southern Territories', code: 'TF'},
             {name: 'Gabon', code: 'GA'},
             {name: 'Gambia', code: 'GM'},
             {name: 'Georgia', code: 'GE'},
             {name: 'Germany', code: 'DE'},
             {name: 'Ghana', code: 'GH'},
             {name: 'Gibraltar', code: 'GI'},
             {name: 'Greece', code: 'GR'},
             {name: 'Greenland', code: 'GL'},
             {name: 'Grenada', code: 'GD'},
             {name: 'Guadeloupe', code: 'GP'},
             {name: 'Guam', code: 'GU'},
             {name: 'Guatemala', code: 'GT'},
             {name: 'Guernsey', code: 'GG'},
             {name: 'Guinea', code: 'GN'},
             {name: 'Guinea-Bissau', code: 'GW'},
             {name: 'Guyana', code: 'GY'},
             {name: 'Haiti', code: 'HT'},
             {name: 'Heard Island and Mcdonald Islands', code: 'HM'},
             {name: 'Holy See (Vatican City State)', code: 'VA'},
             {name: 'Honduras', code: 'HN'},
             {name: 'Hong Kong', code: 'HK'},
             {name: 'Hungary', code: 'HU'},
             {name: 'Iceland', code: 'IS'},
             {name: 'India', code: 'IN'},
             {name: 'Indonesia', code: 'ID'},
             {name: 'Iran, Islamic Republic Of', code: 'IR'},
             {name: 'Iraq', code: 'IQ'},
             {name: 'Ireland', code: 'IE'},
             {name: 'Isle of Man', code: 'IM'},
             {name: 'Israel', code: 'IL'},
             {name: 'Italy', code: 'IT'},
             {name: 'Jamaica', code: 'JM'},
             {name: 'Japan', code: 'JP'},
             {name: 'Jersey', code: 'JE'},
             {name: 'Jordan', code: 'JO'},
             {name: 'Kazakhstan', code: 'KZ'},
             {name: 'Kenya', code: 'KE'},
             {name: 'Kiribati', code: 'KI'},
             {name: 'Korea, Democratic People\'S Republic of', code: 'KP'},
             {name: 'Korea, Republic of', code: 'KR'},
             {name: 'Kuwait', code: 'KW'},
             {name: 'Kyrgyzstan', code: 'KG'},
             {name: 'Lao People\'S Democratic Republic', code: 'LA'},
             {name: 'Latvia', code: 'LV'},
             {name: 'Lebanon', code: 'LB'},
             {name: 'Lesotho', code: 'LS'},
             {name: 'Liberia', code: 'LR'},
             {name: 'Libyan Arab Jamahiriya', code: 'LY'},
             {name: 'Liechtenstein', code: 'LI'},
             {name: 'Lithuania', code: 'LT'},
             {name: 'Luxembourg', code: 'LU'},
             {name: 'Macao', code: 'MO'},
             {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'},
             {name: 'Madagascar', code: 'MG'},
             {name: 'Malawi', code: 'MW'},
             {name: 'Malaysia', code: 'MY'},
             {name: 'Maldives', code: 'MV'},
             {name: 'Mali', code: 'ML'},
             {name: 'Malta', code: 'MT'},
             {name: 'Marshall Islands', code: 'MH'},
             {name: 'Martinique', code: 'MQ'},
             {name: 'Mauritania', code: 'MR'},
             {name: 'Mauritius', code: 'MU'},
             {name: 'Mayotte', code: 'YT'},
             {name: 'Mexico', code: 'MX'},
             {name: 'Micronesia, Federated States of', code: 'FM'},
             {name: 'Moldova, Republic of', code: 'MD'},
             {name: 'Monaco', code: 'MC'},
             {name: 'Mongolia', code: 'MN'},
             {name: 'Montserrat', code: 'MS'},
             {name: 'Morocco', code: 'MA'},
             {name: 'Mozambique', code: 'MZ'},
             {name: 'Myanmar', code: 'MM'},
             {name: 'Namibia', code: 'NA'},
             {name: 'Nauru', code: 'NR'},
             {name: 'Nepal', code: 'NP'},
             {name: 'Netherlands', code: 'NL'},
             {name: 'Netherlands Antilles', code: 'AN'},
             {name: 'New Caledonia', code: 'NC'},
             {name: 'New Zealand', code: 'NZ'},
             {name: 'Nicaragua', code: 'NI'},
             {name: 'Niger', code: 'NE'},
             {name: 'Nigeria', code: 'NG'},
             {name: 'Niue', code: 'NU'},
             {name: 'Norfolk Island', code: 'NF'},
             {name: 'Northern Mariana Islands', code: 'MP'},
             {name: 'Norway', code: 'NO'},
             {name: 'Oman', code: 'OM'},
             {name: 'Pakistan', code: 'PK'},
             {name: 'Palau', code: 'PW'},
             {name: 'Palestinian Territory, Occupied', code: 'PS'},
             {name: 'Panama', code: 'PA'},
             {name: 'Papua New Guinea', code: 'PG'},
             {name: 'Paraguay', code: 'PY'},
             {name: 'Peru', code: 'PE'},
             {name: 'Philippines', code: 'PH'},
             {name: 'Pitcairn', code: 'PN'},
             {name: 'Poland', code: 'PL'},
             {name: 'Portugal', code: 'PT'},
             {name: 'Puerto Rico', code: 'PR'},
             {name: 'Qatar', code: 'QA'},
             {name: 'Reunion', code: 'RE'},
             {name: 'Romania', code: 'RO'},
             {name: 'Russian Federation', code: 'RU'},
             {name: 'RWANDA', code: 'RW'},
             {name: 'Saint Helena', code: 'SH'},
             {name: 'Saint Kitts and Nevis', code: 'KN'},
             {name: 'Saint Lucia', code: 'LC'},
             {name: 'Saint Pierre and Miquelon', code: 'PM'},
             {name: 'Saint Vincent and the Grenadines', code: 'VC'},
             {name: 'Samoa', code: 'WS'},
             {name: 'San Marino', code: 'SM'},
             {name: 'Sao Tome and Principe', code: 'ST'},
             {name: 'Saudi Arabia', code: 'SA'},
             {name: 'Senegal', code: 'SN'},
             {name: 'Serbia and Montenegro', code: 'CS'},
             {name: 'Seychelles', code: 'SC'},
             {name: 'Sierra Leone', code: 'SL'},
             {name: 'Singapore', code: 'SG'},
             {name: 'Slovakia', code: 'SK'},
             {name: 'Slovenia', code: 'SI'},
             {name: 'Solomon Islands', code: 'SB'},
             {name: 'Somalia', code: 'SO'},
             {name: 'South Africa', code: 'ZA'},
             {name: 'South Georgia and the South Sandwich Islands', code: 'GS'},
             {name: 'Spain', code: 'ES'},
             {name: 'Sri Lanka', code: 'LK'},
             {name: 'Sudan', code: 'SD'},
             {name: 'Suriname', code: 'SR'},
             {name: 'Svalbard and Jan Mayen', code: 'SJ'},
             {name: 'Swaziland', code: 'SZ'},
             {name: 'Sweden', code: 'SE'},
             {name: 'Switzerland', code: 'CH'},
             {name: 'Syrian Arab Republic', code: 'SY'},
             {name: 'Taiwan, Province of China', code: 'TW'},
             {name: 'Tajikistan', code: 'TJ'},
             {name: 'Tanzania, United Republic of', code: 'TZ'},
             {name: 'Thailand', code: 'TH'},
             {name: 'Timor-Leste', code: 'TL'},
             {name: 'Togo', code: 'TG'},
             {name: 'Tokelau', code: 'TK'},
             {name: 'Tonga', code: 'TO'},
             {name: 'Trinidad and Tobago', code: 'TT'},
             {name: 'Tunisia', code: 'TN'},
             {name: 'Turkey', code: 'TR'},
             {name: 'Turkmenistan', code: 'TM'},
             {name: 'Turks and Caicos Islands', code: 'TC'},
             {name: 'Tuvalu', code: 'TV'},
             {name: 'Uganda', code: 'UG'},
             {name: 'Ukraine', code: 'UA'},
             {name: 'Uruguay', code: 'UY'},
             {name: 'Uzbekistan', code: 'UZ'},
             {name: 'Vanuatu', code: 'VU'},
             {name: 'Venezuela', code: 'VE'},
             {name: 'Viet Nam', code: 'VN'},
             {name: 'Virgin Islands, British', code: 'VG'},
             {name: 'Virgin Islands, U.S.', code: 'VI'},
             {name: 'Wallis and Futuna', code: 'WF'},
             {name: 'Western Sahara', code: 'EH'},
             {name: 'Yemen', code: 'YE'},
             {name: 'Zambia', code: 'ZM'},
             {name: 'Zimbabwe', code: 'ZW'}
             ];
           }

        function PopulateStates(country) {

            // States
            var s_a = new Array();
            s_a['']="";
            s_a['US']="AL|AK|AZ|AR|CA|CO|CT|DE|DC|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY";
            s_a['GB']="Barking and Dagenham|Barnet|Barnsley|Bath and North East Somerset|Bedfordshire|Bexley|Birmingham|Blackburn with Darwen|Blackpool|Bolton|Bournemouth|Bracknell Forest|Bradford|Brent|Brighton and Hove|Bromley|Buckinghamshire|Bury|Calderdale|Cambridgeshire|Camden|Cheshire|City of Bristol|City of Kingston upon Hull|City of London|Cornwall|Coventry|Croydon|Cumbria|Darlington|Derby|Derbyshire|Devon|Doncaster|Dorset|Dudley|Durham|Ealing|East Riding of Yorkshire|East Sussex|Enfield|Essex|Gateshead|Gloucestershire|Greenwich|Hackney|Halton|Hammersmith and Fulham|Hampshire|Haringey|Harrow|Hartlepool|Havering|Herefordshire|Hertfordshire|Hillingdon|Hounslow|Isle of Wight|Islington|Kensington and Chelsea|Kent|Kingston upon Thames|Kirklees|Knowsley|Lambeth|Lancashire|Leeds|Leicester|Leicestershire|Lewisham|Lincolnshire|Liverpool|Luton|Manchester|Medway|Merton|Middlesbrough|Milton Keynes|Newcastle upon Tyne|Newham|Norfolk|North East Lincolnshire|North Lincolnshire|North Somerset|North Tyneside|North Yorkshire|Northamptonshire|Northumberland|Nottingham|Nottinghamshire|Oldham|Oxfordshire|Peterborough|Plymouth|Poole|Portsmouth|Reading|Redbridge|Redcar and Cleveland|Richmond upon Thames|Rochdale|Rotherham|Rutland|Salford|Sandwell|Sefton|Sheffield|Shropshire|Slough|Solihull|Somerset|South Gloucestershire|South Tyneside|Southampton|Southend-on-Sea|Southwark|St. Helens|Staffordshire|Stockport|Stockton-on-Tees|Stoke-on-Trent|Suffolk|Sunderland|Surrey|Sutton|Swindon|Tameside|Telford and Wrekin|Thurrock|Torbay|Tower Hamlets|Trafford|Wakefield|Walsall|Waltham Forest|Wandsworth|Warrington|Warwickshire|West Berkshire|West Sussex|Westminster|Wigan|Wiltshire|Windsor and Maidenhead|Wirral|Wokingham|Wolverhampton|Worcestershire|York";
            s_a['AF']="Badakhshan|Badghis|Baghlan|Balkh|Bamian|Farah|Faryab|Ghazni|Ghowr|Helmand|Herat|Jowzjan|Kabol|Kandahar|Kapisa|Konar|Kondoz|Laghman|Lowgar|Nangarhar|Nimruz|Oruzgan|Paktia|Paktika|Parvan|Samangan|Sar-e Pol|Takhar|Vardak|Zabol";
            s_a['AL']="Berat|Bulqize|Delvine|Devoll (Bilisht)|Diber (Peshkopi)|Durres|Elbasan|Fier|Gjirokaster|Gramsh|Has (Krume)|Kavaje|Kolonje (Erseke)|Korce|Kruje|Kucove|Kukes|Kurbin|Lezhe|Librazhd|Lushnje|Malesi e Madhe (Koplik)|Mallakaster (Ballsh)|Mat (Burrel)|Mirdite (Rreshen)|Peqin|Permet|Pogradec|Puke|Sarande|Shkoder|Skrapar (Corovode)|Tepelene|Tirane (Tirana)|Tirane (Tirana)|Tropoje (Bajram Curri)|Vlore";
            s_a['DZ']="Adrar|Ain Defla|Ain Temouchent|Alger|Annaba|Batna|Bechar|Bejaia|Biskra|Blida|Bordj Bou Arreridj|Bouira|Boumerdes|Chlef|Constantine|Djelfa|El Bayadh|El Oued|El Tarf|Ghardaia|Guelma|Illizi|Jijel|Khenchela|Laghouat|M'Sila|Mascara|Medea|Mila|Mostaganem|Naama|Oran|Ouargla|Oum el Bouaghi|Relizane|Saida|Setif|Sidi Bel Abbes|Skikda|Souk Ahras|Tamanghasset|Tebessa|Tiaret|Tindouf|Tipaza|Tissemsilt|Tizi Ouzou|Tlemcen";
            s_a['AS']="Eastern|Manu'a|Rose Island|Swains Island|Western";
            s_a['AO']="Andorra la Vella|Bengo|Benguela|Bie|Cabinda|Canillo|Cuando Cubango|Cuanza Norte|Cuanza Sul|Cunene|Encamp|Escaldes-Engordany|Huambo|Huila|La Massana|Luanda|Lunda Norte|Lunda Sul|Malanje|Moxico|Namibe|Ordino|Sant Julia de Loria|Uige|Zaire";
            s_a['AI']="Anguilla";
            s_a['AQ']="Antartica";
            s_a['AG']="Barbuda|Redonda|Saint George|Saint John|Saint Mary|Saint Paul|Saint Peter|Saint Philip";
            s_a['AR']="Antartica e Islas del Atlantico Sur|Buenos Aires|Buenos Aires Capital Federal|Catamarca|Chaco|Chubut|Cordoba|Corrientes|Entre Rios|Formosa|Jujuy|La Pampa|La Rioja|Mendoza|Misiones|Neuquen|Rio Negro|Salta|San Juan|San Luis|Santa Cruz|Santa Fe|Santiago del Estero|Tierra del Fuego|Tucuman";
            s_a['AM']="Aragatsotn|Ararat|Armavir|Geghark'unik'|Kotayk'|Lorri|Shirak|Syunik'|Tavush|Vayots' Dzor|Yerevan";
            s_a['AW']="Aruba";
            s_a['AU']="Australian Capital Territory|New South Wales|Northern Territory|Queensland|South Australia|Tasmania|Victoria|Western Australia";
            s_a['AT']="Burgenland|Kaernten|Niederoesterreich|Oberoesterreich|Salzburg|Steiermark|Tirol|Vorarlberg|Wien";
            s_a['AZ']="Abseron Rayonu|Agcabadi Rayonu|Agdam Rayonu|Agdas Rayonu|Agstafa Rayonu|Agsu Rayonu|Ali Bayramli Sahari|Astara Rayonu|Baki Sahari|Balakan Rayonu|Barda Rayonu|Beylaqan Rayonu|Bilasuvar Rayonu|Cabrayil Rayonu|Calilabad Rayonu|Daskasan Rayonu|Davaci Rayonu|Fuzuli Rayonu|Gadabay Rayonu|Ganca Sahari|Goranboy Rayonu|Goycay Rayonu|Haciqabul Rayonu|Imisli Rayonu|Ismayilli Rayonu|Kalbacar Rayonu|Kurdamir Rayonu|Lacin Rayonu|Lankaran Rayonu|Lankaran Sahari|Lerik Rayonu|Masalli Rayonu|Mingacevir Sahari|Naftalan Sahari|Naxcivan Muxtar Respublikasi|Neftcala Rayonu|Oguz Rayonu|Qabala Rayonu|Qax Rayonu|Qazax Rayonu|Qobustan Rayonu|Quba Rayonu|Qubadli Rayonu|Qusar Rayonu|Saatli Rayonu|Sabirabad Rayonu|Saki Rayonu|Saki Sahari|Salyan Rayonu|Samaxi Rayonu|Samkir Rayonu|Samux Rayonu|Siyazan Rayonu|Sumqayit Sahari|Susa Rayonu|Susa Sahari|Tartar Rayonu|Tovuz Rayonu|Ucar Rayonu|Xacmaz Rayonu|Xankandi Sahari|Xanlar Rayonu|Xizi Rayonu|Xocali Rayonu|Xocavand Rayonu|Yardimli Rayonu|Yevlax Rayonu|Yevlax Sahari|Zangilan Rayonu|Zaqatala Rayonu|Zardab Rayonu";
            s_a['BS']="Al Hadd|Al Manamah|Al Mintaqah al Gharbiyah|Al Mintaqah al Wusta|Al Mintaqah ash Shamaliyah|Al Muharraq|Ar Rifa' wa al Mintaqah al Janubiyah|Jidd Hafs|Juzur Hawar|Madinat 'Isa|Madinat Hamad|Sitrah";
            s_a['BD']="Barguna|Barisal|Bhola|Jhalokati|Patuakhali|Pirojpur|Bandarban|Brahmanbaria|Chandpur|Chittagong|Comilla|Cox's Bazar|Feni|Khagrachari|Lakshmipur|Noakhali|Rangamati|Dhaka|Faridpur|Gazipur|Gopalganj|Jamalpur|Kishoreganj|Madaripur|Manikganj|Munshiganj|Mymensingh|Narayanganj|Narsingdi|Netrokona|Rajbari|Shariatpur|Sherpur|Tangail|Bagerhat|Chuadanga|Jessore|Jhenaidah|Khulna|Kushtia|Magura|Meherpur|Narail|Satkhira|Bogra|Dinajpur|Gaibandha|Jaipurhat|Kurigram|Lalmonirhat|Naogaon|Natore|Nawabganj|Nilphamari|Pabna|Panchagarh|Rajshahi|Rangpur|Sirajganj|Thakurgaon|Habiganj|Maulvi bazar|Sunamganj|Sylhet";
            s_a['BB']="Bridgetown|Christ Church|Saint Andrew|Saint George|Saint James|Saint John|Saint Joseph|Saint Lucy|Saint Michael|Saint Peter|Saint Philip|Saint Thomas";
            s_a['BY']="Brestskaya (Brest)|Homyel'skaya (Homyel')|Horad Minsk|Hrodzyenskaya (Hrodna)|Mahilyowskaya (Mahilyow)|Minskaya|Vitsyebskaya (Vitsyebsk)";
            s_a['BE']="Antwerpen|Brabant Wallon|Brussels Capitol Region|Hainaut|Liege|Limburg|Luxembourg|Namur|Oost-Vlaanderen|Vlaams Brabant|West-Vlaanderen";
            s_a['BZ']="Belize|Cayo|Corozal|Orange Walk|Stann Creek|Toledo";
            s_a['BJ']="Alibori|Atakora|Atlantique|Borgou|Collines|Couffo|Donga|Littoral|Mono|Oueme|Plateau|Zou";
            s_a['BM']="Devonshire|Hamilton|Hamilton|Paget|Pembroke|Saint George|Saint Georges|Sandys|Smiths|Southampton|Warwick";
            s_a['BT']="Bumthang|Chhukha|Chirang|Daga|Geylegphug|Ha|Lhuntshi|Mongar|Paro|Pemagatsel|Punakha|Samchi|Samdrup Jongkhar|Shemgang|Tashigang|Thimphu|Tongsa|Wangdi Phodrang";
            s_a['BO']="Beni|Chuquisaca|Cochabamba|La Paz|Oruro|Pando|Potosi|Santa Cruz|Tarija";
            s_a['CA']="AB|BC|MB|NB|NL|NS|ON|PE|QC|SK|NT|NU|YT";
            s_a['MX']="DIF|AGS|BCN|BCS|CAM|CHP|CHI|COA|COL|DUR|GTO|GRO|HGO|JAL|MEX|MIC|MOR|NAY|NLE|OAX|PUE|QRO|ROO|SLP|SIN|SON|TAB|TAM|TLX|VER|YUC|ZAC";

            if(country != null && country != 0){
                var states = s_a[country];
                return states.split('|');
            }

        }
        
        return {
            getAllGiftCards             : GetAllGiftCards,
            getAllGiftCardsFromAdmin    : GetAllGiftCardsFromAdmin,
            getHouseAssignedGiftCards   : GetHouseAssignedGiftCards,
            getChildAssignedGiftCards   : GetChildAssignedGiftCards,
            assignGiftCardToHouse       : AssignGiftCardToHouse,
            assignGiftCardToHouseBySponsor       : AssignGiftCardToHouseBySponsor,
            childRequestGiftCard        : ChildRequestGiftCard,
            rejectGiftCard              : RejectGiftCard,
            updateHouseAssignCard       : UpdateHouseAssignCard,
            loadCardRequests            : LoadCardRequests,
            loadChildGiftCardRequestsFromSponsor            : LoadChildGiftCardRequestsFromSponsor,
            getGiftcardsByChildId       : GetGiftcardsByChildId,
            getHouseGiftCards           : GetHouseGiftCards,
            getHouseGiftCardByChild     : GetHouseGiftCardByChild,
            getChaildGiftCardByChildGiftCard     : GetChaildGiftCardByChildGiftCard,
            purchaseGiftCard            : PurchaseGiftCard,
            canChildRequestGiftCardFromSponsor            : CanChildRequestGiftCardFromSponsor,
            getCountryList            : GetCountryList,
            populateStates            : PopulateStates,
            isAvailablePonintForRequest            : IsAvailablePonintForRequest,
        };
    }]);
})();