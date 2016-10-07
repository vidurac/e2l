(function() {
    'use strict';
    angularEarnToLearnServices.factory('UserService', ['$http', '$state', '$resource', '$cookieStore', '$rootScope', '$q', '$localStorage', '_URLS', 'AUTH_EVENTS', 'Upload', '$filter', function($http, $state, $resource, $cookieStore, $rootScope, $q, $localStorage, _URLS, AUTH_EVENTS, Upload, $filter) {
        // Get All Users
        function GetAllUsers() {
            return $resource(_URLS.BASE_API + 'get_all_users' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        function GetRecentlyAddedParents(limit) {
            return $resource(_URLS.BASE_API + 'get_all_parents_with_child_count'+ '/' + limit + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        // Get User By ID
        function GetUserById(id) {
            return $resource(_URLS.BASE_API + 'get_user_by_id/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get users by house id
        function GetUsersByHouseId(id) {
            return $resource(_URLS.BASE_API + 'get_all_users_by_house/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        // Get users messages by house id
        function GetUsersMessages(houseid,id) {
            return $resource(_URLS.BASE_API + 'get_all_user_messages/' + houseid + '/' + id +_URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get users by house id
        function LoadRecentActivities(id) {
            // console.log('kkkk');
            // console.log(id);
            return $resource(_URLS.BASE_API + 'load_recent_activities/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get users by user role
        function GetUsersByUserRole(roleId) {
            return $resource(_URLS.BASE_API + 'get_all_users_by_userrole/' + roleId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get user by name
        function GetUserByName(name) {
            return $resource(_URLS.BASE_API + 'get_user_by_name/' + name + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        function GetAllSponsoredChildren() {
            return $resource(_URLS.BASE_API + 'get_all_sponsored_children' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        function CheckIsSponsor() {
            return $resource(_URLS.BASE_API + 'check-sponsor' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        function GetSponsorAccessibleHouseDetails() {
            return $resource(_URLS.BASE_API + 'get-sponsor-accessible-house-details' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Create User
        function CreateUser(user,date_of_birth) {
            
            if (user.house_id == undefined) {
                user.house_id = null;
            }
            
            return $resource(_URLS.BASE_API + 'user' + _URLS.TOKEN_API + $localStorage.token, {
                f_name        	: user.f_name,
                l_name        	: user.l_name,
                email           : user.email,
                password   	    : user.password,
                username  	    : user.username,
                telephone  	    : user.telephone,
                mobile          : user.mobile,
                address     	: user.address,
                city            : user.city,
                country         : user.country,
                //date_of_birth	: user.date_of_birth,
                date_of_birth	: date_of_birth,
                gender        	: user.gender,
                profession   	: user.profession,
                profile_image	: user.profile_image,
                role_id         : user.role_id,
                enable         	: user.enable,
                house_id        : user.house_id
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }


        
        // Update User
        function UpdateUser(id, user) {
            console.log(user);
            return $resource(_URLS.BASE_API + 'user/' + id + _URLS.TOKEN_API + $localStorage.token, {
                f_name        	: user.f_name,
                l_name        	: user.l_name,
                email           : user.email,
                telephone  	    : user.telephone,
                mobile          : user.mobile,
                address     	: user.address,
                city            : user.city,
                country         : user.country,
                state          : user.state,
                date_of_birth	: user.date_of_birth,
                gender        	: user.gender,
                profession   	: user.profession,
                profile_image	: user.profile_image,
                role_id         : user.role_id,
                enable         	: user.enable,
                _method         : "PATCH"
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }



        // Update User
        function DeleteUser(id) {
            //console.log('11111......');
            return $resource(_URLS.BASE_API + 'user/deleteUser/' + id + _URLS.TOKEN_API + $localStorage.token, {
                id        	: id
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }

        // Delete User
        function DeleteUser(id) {
            console.log('2222......');
            return $resource(_URLS.BASE_API + 'user_delete/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Soft Delete User
        function SoftDeleteUser(id) {
            console.log('2222......');
            return $resource(_URLS.BASE_API + 'user_soft_delete/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        // Soft Delete Child User
        function SoftDeleteChildUser(id) {
            console.log('2222......');
            return $resource(_URLS.BASE_API + 'user_child_delete/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        // Get Country List
        function GetCountryList() {
            /*return [ 
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
            ];*/
            return new Array("USA", "United Kingdom","Afghanistan", "Albania", "Algeria", "American Samoa", "Angola", "Anguilla", "Antartica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Ashmore and Cartier Island", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burma", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Clipperton Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo, Democratic Republic of the", "Congo, Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czeck Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Europa Island", "Falkland Islands (Islas Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern and Antarctic Lands", "Gabon", "Gambia, The", "Gaza Strip", "Georgia", "Germany", "Ghana", "Gibraltar", "Glorioso Islands", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and McDonald Islands", "Holy See (Vatican City)", "Honduras", "Hong Kong", "Howland Island", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Ireland, Northern", "Israel", "Italy", "Jamaica", "Jan Mayen", "Japan", "Jarvis Island", "Jersey", "Johnston Atoll", "Jordan", "Juan de Nova Island", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Man, Isle of", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Midway Islands", "Moldova", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcaim Islands", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romainia", "Russia", "Rwanda", "Saint Helena", "Saint Kitts and Nevis", "Saint Lucia", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Scotland", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and South Sandwich Islands", "Spain", "Spratly Islands", "Sri Lanka", "Sudan", "Suriname", "Svalbard", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Tobago", "Toga", "Tokelau", "Tonga", "Trinidad", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands", "Wales", "Wallis and Futuna", "West Bank", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe");
        }
        
        // Populate states
        function PopulateStates(country) {
            
            // States
            var s_a = new Array();
            s_a[0]="";
            s_a[1]="Alabama|Alaska|Arizona|Arkansas|California|Colorado|Connecticut|Delaware|District of Columbia|Florida|Georgia|Hawaii|Idaho|Illinois|Indiana|Iowa|Kansas|Kentucky|Louisiana|Maine|Maryland|Massachusetts|Michigan|Minnesota|Mississippi|Missouri|Montana|Nebraska|Nevada|New Hampshire|New Jersey|New Mexico|New York|North Carolina|North Dakota|Ohio|Oklahoma|Oregon|Pennsylvania|Rhode Island|South Carolina|South Dakota|Tennessee|Texas|Utah|Vermont|Virginia|Washington|West Virginia|Wisconsin|Wyoming";
            s_a[2]="Barking and Dagenham|Barnet|Barnsley|Bath and North East Somerset|Bedfordshire|Bexley|Birmingham|Blackburn with Darwen|Blackpool|Bolton|Bournemouth|Bracknell Forest|Bradford|Brent|Brighton and Hove|Bromley|Buckinghamshire|Bury|Calderdale|Cambridgeshire|Camden|Cheshire|City of Bristol|City of Kingston upon Hull|City of London|Cornwall|Coventry|Croydon|Cumbria|Darlington|Derby|Derbyshire|Devon|Doncaster|Dorset|Dudley|Durham|Ealing|East Riding of Yorkshire|East Sussex|Enfield|Essex|Gateshead|Gloucestershire|Greenwich|Hackney|Halton|Hammersmith and Fulham|Hampshire|Haringey|Harrow|Hartlepool|Havering|Herefordshire|Hertfordshire|Hillingdon|Hounslow|Isle of Wight|Islington|Kensington and Chelsea|Kent|Kingston upon Thames|Kirklees|Knowsley|Lambeth|Lancashire|Leeds|Leicester|Leicestershire|Lewisham|Lincolnshire|Liverpool|Luton|Manchester|Medway|Merton|Middlesbrough|Milton Keynes|Newcastle upon Tyne|Newham|Norfolk|North East Lincolnshire|North Lincolnshire|North Somerset|North Tyneside|North Yorkshire|Northamptonshire|Northumberland|Nottingham|Nottinghamshire|Oldham|Oxfordshire|Peterborough|Plymouth|Poole|Portsmouth|Reading|Redbridge|Redcar and Cleveland|Richmond upon Thames|Rochdale|Rotherham|Rutland|Salford|Sandwell|Sefton|Sheffield|Shropshire|Slough|Solihull|Somerset|South Gloucestershire|South Tyneside|Southampton|Southend-on-Sea|Southwark|St. Helens|Staffordshire|Stockport|Stockton-on-Tees|Stoke-on-Trent|Suffolk|Sunderland|Surrey|Sutton|Swindon|Tameside|Telford and Wrekin|Thurrock|Torbay|Tower Hamlets|Trafford|Wakefield|Walsall|Waltham Forest|Wandsworth|Warrington|Warwickshire|West Berkshire|West Sussex|Westminster|Wigan|Wiltshire|Windsor and Maidenhead|Wirral|Wokingham|Wolverhampton|Worcestershire|York";
            s_a[3]="Badakhshan|Badghis|Baghlan|Balkh|Bamian|Farah|Faryab|Ghazni|Ghowr|Helmand|Herat|Jowzjan|Kabol|Kandahar|Kapisa|Konar|Kondoz|Laghman|Lowgar|Nangarhar|Nimruz|Oruzgan|Paktia|Paktika|Parvan|Samangan|Sar-e Pol|Takhar|Vardak|Zabol";
            s_a[4]="Berat|Bulqize|Delvine|Devoll (Bilisht)|Diber (Peshkopi)|Durres|Elbasan|Fier|Gjirokaster|Gramsh|Has (Krume)|Kavaje|Kolonje (Erseke)|Korce|Kruje|Kucove|Kukes|Kurbin|Lezhe|Librazhd|Lushnje|Malesi e Madhe (Koplik)|Mallakaster (Ballsh)|Mat (Burrel)|Mirdite (Rreshen)|Peqin|Permet|Pogradec|Puke|Sarande|Shkoder|Skrapar (Corovode)|Tepelene|Tirane (Tirana)|Tirane (Tirana)|Tropoje (Bajram Curri)|Vlore";
            s_a[5]="Adrar|Ain Defla|Ain Temouchent|Alger|Annaba|Batna|Bechar|Bejaia|Biskra|Blida|Bordj Bou Arreridj|Bouira|Boumerdes|Chlef|Constantine|Djelfa|El Bayadh|El Oued|El Tarf|Ghardaia|Guelma|Illizi|Jijel|Khenchela|Laghouat|M'Sila|Mascara|Medea|Mila|Mostaganem|Naama|Oran|Ouargla|Oum el Bouaghi|Relizane|Saida|Setif|Sidi Bel Abbes|Skikda|Souk Ahras|Tamanghasset|Tebessa|Tiaret|Tindouf|Tipaza|Tissemsilt|Tizi Ouzou|Tlemcen";
            s_a[6]="Eastern|Manu'a|Rose Island|Swains Island|Western";
            s_a[7]="Andorra la Vella|Bengo|Benguela|Bie|Cabinda|Canillo|Cuando Cubango|Cuanza Norte|Cuanza Sul|Cunene|Encamp|Escaldes-Engordany|Huambo|Huila|La Massana|Luanda|Lunda Norte|Lunda Sul|Malanje|Moxico|Namibe|Ordino|Sant Julia de Loria|Uige|Zaire";
            s_a[8]="Anguilla";
            s_a[9]="Antartica";
            s_a[10]="Barbuda|Redonda|Saint George|Saint John|Saint Mary|Saint Paul|Saint Peter|Saint Philip";
            s_a[11]="Antartica e Islas del Atlantico Sur|Buenos Aires|Buenos Aires Capital Federal|Catamarca|Chaco|Chubut|Cordoba|Corrientes|Entre Rios|Formosa|Jujuy|La Pampa|La Rioja|Mendoza|Misiones|Neuquen|Rio Negro|Salta|San Juan|San Luis|Santa Cruz|Santa Fe|Santiago del Estero|Tierra del Fuego|Tucuman";
            s_a[12]="Aragatsotn|Ararat|Armavir|Geghark'unik'|Kotayk'|Lorri|Shirak|Syunik'|Tavush|Vayots' Dzor|Yerevan";
            s_a[13]="Aruba";
            s_a[14]="Ashmore and Cartier Island";
            s_a[15]="Australian Capital Territory|New South Wales|Northern Territory|Queensland|South Australia|Tasmania|Victoria|Western Australia";
            s_a[16]="Burgenland|Kaernten|Niederoesterreich|Oberoesterreich|Salzburg|Steiermark|Tirol|Vorarlberg|Wien";
            s_a[17]="Abseron Rayonu|Agcabadi Rayonu|Agdam Rayonu|Agdas Rayonu|Agstafa Rayonu|Agsu Rayonu|Ali Bayramli Sahari|Astara Rayonu|Baki Sahari|Balakan Rayonu|Barda Rayonu|Beylaqan Rayonu|Bilasuvar Rayonu|Cabrayil Rayonu|Calilabad Rayonu|Daskasan Rayonu|Davaci Rayonu|Fuzuli Rayonu|Gadabay Rayonu|Ganca Sahari|Goranboy Rayonu|Goycay Rayonu|Haciqabul Rayonu|Imisli Rayonu|Ismayilli Rayonu|Kalbacar Rayonu|Kurdamir Rayonu|Lacin Rayonu|Lankaran Rayonu|Lankaran Sahari|Lerik Rayonu|Masalli Rayonu|Mingacevir Sahari|Naftalan Sahari|Naxcivan Muxtar Respublikasi|Neftcala Rayonu|Oguz Rayonu|Qabala Rayonu|Qax Rayonu|Qazax Rayonu|Qobustan Rayonu|Quba Rayonu|Qubadli Rayonu|Qusar Rayonu|Saatli Rayonu|Sabirabad Rayonu|Saki Rayonu|Saki Sahari|Salyan Rayonu|Samaxi Rayonu|Samkir Rayonu|Samux Rayonu|Siyazan Rayonu|Sumqayit Sahari|Susa Rayonu|Susa Sahari|Tartar Rayonu|Tovuz Rayonu|Ucar Rayonu|Xacmaz Rayonu|Xankandi Sahari|Xanlar Rayonu|Xizi Rayonu|Xocali Rayonu|Xocavand Rayonu|Yardimli Rayonu|Yevlax Rayonu|Yevlax Sahari|Zangilan Rayonu|Zaqatala Rayonu|Zardab Rayonu";
            s_a[18]="Acklins and Crooked Islands|Bimini|Cat Island|Exuma|Freeport|Fresh Creek|Governor's Harbour|Green Turtle Cay|Harbour Island|High Rock|Inagua|Kemps Bay|Long Island|Marsh Harbour|Mayaguana|New Providence|Nicholls Town and Berry Islands|Ragged Island|Rock Sound|San Salvador and Rum Cay|Sandy Point";
            s_a[19]="Al Hadd|Al Manamah|Al Mintaqah al Gharbiyah|Al Mintaqah al Wusta|Al Mintaqah ash Shamaliyah|Al Muharraq|Ar Rifa' wa al Mintaqah al Janubiyah|Jidd Hafs|Juzur Hawar|Madinat 'Isa|Madinat Hamad|Sitrah";
            s_a[20]="Barguna|Barisal|Bhola|Jhalokati|Patuakhali|Pirojpur|Bandarban|Brahmanbaria|Chandpur|Chittagong|Comilla|Cox's Bazar|Feni|Khagrachari|Lakshmipur|Noakhali|Rangamati|Dhaka|Faridpur|Gazipur|Gopalganj|Jamalpur|Kishoreganj|Madaripur|Manikganj|Munshiganj|Mymensingh|Narayanganj|Narsingdi|Netrokona|Rajbari|Shariatpur|Sherpur|Tangail|Bagerhat|Chuadanga|Jessore|Jhenaidah|Khulna|Kushtia|Magura|Meherpur|Narail|Satkhira|Bogra|Dinajpur|Gaibandha|Jaipurhat|Kurigram|Lalmonirhat|Naogaon|Natore|Nawabganj|Nilphamari|Pabna|Panchagarh|Rajshahi|Rangpur|Sirajganj|Thakurgaon|Habiganj|Maulvi bazar|Sunamganj|Sylhet";
            s_a[21]="Bridgetown|Christ Church|Saint Andrew|Saint George|Saint James|Saint John|Saint Joseph|Saint Lucy|Saint Michael|Saint Peter|Saint Philip|Saint Thomas";
            s_a[22]="Brestskaya (Brest)|Homyel'skaya (Homyel')|Horad Minsk|Hrodzyenskaya (Hrodna)|Mahilyowskaya (Mahilyow)|Minskaya|Vitsyebskaya (Vitsyebsk)";
            s_a[23]="Antwerpen|Brabant Wallon|Brussels Capitol Region|Hainaut|Liege|Limburg|Luxembourg|Namur|Oost-Vlaanderen|Vlaams Brabant|West-Vlaanderen";
            s_a[24]="Belize|Cayo|Corozal|Orange Walk|Stann Creek|Toledo";
            s_a[25]="Alibori|Atakora|Atlantique|Borgou|Collines|Couffo|Donga|Littoral|Mono|Oueme|Plateau|Zou";
            s_a[26]="Devonshire|Hamilton|Hamilton|Paget|Pembroke|Saint George|Saint Georges|Sandys|Smiths|Southampton|Warwick";
            s_a[27]="Bumthang|Chhukha|Chirang|Daga|Geylegphug|Ha|Lhuntshi|Mongar|Paro|Pemagatsel|Punakha|Samchi|Samdrup Jongkhar|Shemgang|Tashigang|Thimphu|Tongsa|Wangdi Phodrang";
            s_a[28]="Beni|Chuquisaca|Cochabamba|La Paz|Oruro|Pando|Potosi|Santa Cruz|Tarija";
            s_a[29]="Federation of Bosnia and Herzegovina|Republika Srpska";
            s_a[30]="Central|Chobe|Francistown|Gaborone|Ghanzi|Kgalagadi|Kgatleng|Kweneng|Lobatse|Ngamiland|North-East|Selebi-Pikwe|South-East|Southern";
            s_a[31]="Acre|Alagoas|Amapa|Amazonas|Bahia|Ceara|Distrito Federal|Espirito Santo|Goias|Maranhao|Mato Grosso|Mato Grosso do Sul|Minas Gerais|Para|Paraiba|Parana|Pernambuco|Piaui|Rio de Janeiro|Rio Grande do Norte|Rio Grande do Sul|Rondonia|Roraima|Santa Catarina|Sao Paulo|Sergipe|Tocantins";
            s_a[32]="Anegada|Jost Van Dyke|Tortola|Virgin Gorda";
            s_a[33]="Belait|Brunei and Muara|Temburong|Tutong";
            s_a[34]="Blagoevgrad|Burgas|Dobrich|Gabrovo|Khaskovo|Kurdzhali|Kyustendil|Lovech|Montana|Pazardzhik|Pernik|Pleven|Plovdiv|Razgrad|Ruse|Shumen|Silistra|Sliven|Smolyan|Sofiya|Sofiya-Grad|Stara Zagora|Turgovishte|Varna|Veliko Turnovo|Vidin|Vratsa|Yambol";
            s_a[35]="Bale|Bam|Banwa|Bazega|Bougouriba|Boulgou|Boulkiemde|Comoe|Ganzourgou|Gnagna|Gourma|Houet|Ioba|Kadiogo|Kenedougou|Komandjari|Kompienga|Kossi|Koupelogo|Kouritenga|Kourweogo|Leraba|Loroum|Mouhoun|Nahouri|Namentenga|Naumbiel|Nayala|Oubritenga|Oudalan|Passore|Poni|Samentenga|Sanguie|Seno|Sissili|Soum|Sourou|Tapoa|Tuy|Yagha|Yatenga|Ziro|Zondomo|Zoundweogo";
            s_a[36]="Ayeyarwady|Bago|Chin State|Kachin State|Kayah State|Kayin State|Magway|Mandalay|Mon State|Rakhine State|Sagaing|Shan State|Tanintharyi|Yangon";
            s_a[37]="Bubanza|Bujumbura|Bururi|Cankuzo|Cibitoke|Gitega|Karuzi|Kayanza|Kirundo|Makamba|Muramvya|Muyinga|Mwaro|Ngozi|Rutana|Ruyigi";
            s_a[38]="Banteay Mean Cheay|Batdambang|Kampong Cham|Kampong Chhnang|Kampong Spoe|Kampong Thum|Kampot|Kandal|Kaoh Kong|Keb|Kracheh|Mondol Kiri|Otdar Mean Cheay|Pailin|Phnum Penh|Pouthisat|Preah Seihanu (Sihanoukville)|Preah Vihear|Prey Veng|Rotanah Kiri|Siem Reab|Stoeng Treng|Svay Rieng|Takev";
            s_a[39]="Adamaoua|Centre|Est|Extreme-Nord|Littoral|Nord|Nord-Ouest|Ouest|Sud|Sud-Ouest";
            s_a[40]="Alberta|British Columbia|Manitoba|New Brunswick|Newfoundland|Northwest Territories|Nova Scotia|Nunavut|Ontario|Prince Edward Island|Quebec|Saskatchewan|Yukon Territory";
            s_a[41]="Boa Vista|Brava|Maio|Mosteiros|Paul|Porto Novo|Praia|Ribeira Grande|Sal|Santa Catarina|Santa Cruz|Sao Domingos|Sao Filipe|Sao Nicolau|Sao Vicente|Tarrafal";
            s_a[42]="Creek|Eastern|Midland|South Town|Spot Bay|Stake Bay|West End|Western";
            s_a[43]="Bamingui-Bangoran|Bangui|Basse-Kotto|Gribingui|Haut-Mbomou|Haute-Kotto|Haute-Sangha|Kemo-Gribingui|Lobaye|Mbomou|Nana-Mambere|Ombella-Mpoko|Ouaka|Ouham|Ouham-Pende|Sangha|Vakaga";
            s_a[44]="Batha|Biltine|Borkou-Ennedi-Tibesti|Chari-Baguirmi|Guera|Kanem|Lac|Logone Occidental|Logone Oriental|Mayo-Kebbi|Moyen-Chari|Ouaddai|Salamat|Tandjile";
            s_a[45]="Aisen del General Carlos Ibanez del Campo|Antofagasta|Araucania|Atacama|Bio-Bio|Coquimbo|Libertador General Bernardo O'Higgins|Los Lagos|Magallanes y de la Antartica Chilena|Maule|Region Metropolitana (Santiago)|Tarapaca|Valparaiso";
            s_a[46]="Anhui|Beijing|Chongqing|Fujian|Gansu|Guangdong|Guangxi|Guizhou|Hainan|Hebei|Heilongjiang|Henan|Hubei|Hunan|Jiangsu|Jiangxi|Jilin|Liaoning|Nei Mongol|Ningxia|Qinghai|Shaanxi|Shandong|Shanghai|Shanxi|Sichuan|Tianjin|Xinjiang|Xizang (Tibet)|Yunnan|Zhejiang";
            s_a[47]="Christmas Island";
            s_a[48]="Clipperton Island";
            s_a[49]="Direction Island|Home Island|Horsburgh Island|North Keeling Island|South Island|West Island";
            s_a[50]="Amazonas|Antioquia|Arauca|Atlantico|Bolivar|Boyaca|Caldas|Caqueta|Casanare|Cauca|Cesar|Choco|Cordoba|Cundinamarca|Distrito Capital de Santa Fe de Bogota|Guainia|Guaviare|Huila|La Guajira|Magdalena|Meta|Narino|Norte de Santander|Putumayo|Quindio|Risaralda|San Andres y Providencia|Santander|Sucre|Tolima|Valle del Cauca|Vaupes|Vichada";
            s_a[51]="Anjouan (Nzwani)|Domoni|Fomboni|Grande Comore (Njazidja)|Moheli (Mwali)|Moroni|Moutsamoudou";
            s_a[52]="Bandundu|Bas-Congo|Equateur|Kasai-Occidental|Kasai-Oriental|Katanga|Kinshasa|Maniema|Nord-Kivu|Orientale|Sud-Kivu";
            s_a[53]="Bouenza|Brazzaville|Cuvette|Kouilou|Lekoumou|Likouala|Niari|Plateaux|Pool|Sangha";
            s_a[54]="Aitutaki|Atiu|Avarua|Mangaia|Manihiki|Manuae|Mauke|Mitiaro|Nassau Island|Palmerston|Penrhyn|Pukapuka|Rakahanga|Rarotonga|Suwarrow|Takutea";
            s_a[55]="Alajuela|Cartago|Guanacaste|Heredia|Limon|Puntarenas|San Jose";
            s_a[56]="Abengourou|Abidjan|Aboisso|Adiake'|Adzope|Agboville|Agnibilekrou|Ale'pe'|Bangolo|Beoumi|Biankouma|Bocanda|Bondoukou|Bongouanou|Bouafle|Bouake|Bouna|Boundiali|Dabakala|Dabon|Daloa|Danane|Daoukro|Dimbokro|Divo|Duekoue|Ferkessedougou|Gagnoa|Grand Bassam|Grand-Lahou|Guiglo|Issia|Jacqueville|Katiola|Korhogo|Lakota|Man|Mankono|Mbahiakro|Odienne|Oume|Sakassou|San-Pedro|Sassandra|Seguela|Sinfra|Soubre|Tabou|Tanda|Tiassale|Tiebissou|Tingrela|Touba|Toulepleu|Toumodi|Vavoua|Yamoussoukro|Zuenoula";
            s_a[57]="Bjelovarsko-Bilogorska Zupanija|Brodsko-Posavska Zupanija|Dubrovacko-Neretvanska Zupanija|Istarska Zupanija|Karlovacka Zupanija|Koprivnicko-Krizevacka Zupanija|Krapinsko-Zagorska Zupanija|Licko-Senjska Zupanija|Medimurska Zupanija|Osjecko-Baranjska Zupanija|Pozesko-Slavonska Zupanija|Primorsko-Goranska Zupanija|Sibensko-Kninska Zupanija|Sisacko-Moslavacka Zupanija|Splitsko-Dalmatinska Zupanija|Varazdinska Zupanija|Viroviticko-Podravska Zupanija|Vukovarsko-Srijemska Zupanija|Zadarska Zupanija|Zagreb|Zagrebacka Zupanija";
            s_a[58]="Camaguey|Ciego de Avila|Cienfuegos|Ciudad de La Habana|Granma|Guantanamo|Holguin|Isla de la Juventud|La Habana|Las Tunas|Matanzas|Pinar del Rio|Sancti Spiritus|Santiago de Cuba|Villa Clara";
            s_a[59]="Famagusta|Kyrenia|Larnaca|Limassol|Nicosia|Paphos";
            s_a[60]="Brnensky|Budejovicky|Jihlavsky|Karlovarsky|Kralovehradecky|Liberecky|Olomoucky|Ostravsky|Pardubicky|Plzensky|Praha|Stredocesky|Ustecky|Zlinsky";
            s_a[61]="Arhus|Bornholm|Fredericksberg|Frederiksborg|Fyn|Kobenhavn|Kobenhavns|Nordjylland|Ribe|Ringkobing|Roskilde|Sonderjylland|Storstrom|Vejle|Vestsjalland|Viborg";
            s_a[62]="'Ali Sabih|Dikhil|Djibouti|Obock|Tadjoura";
            s_a[63]="Saint Andrew|Saint David|Saint George|Saint John|Saint Joseph|Saint Luke|Saint Mark|Saint Patrick|Saint Paul|Saint Peter";
            s_a[64]="Azua|Baoruco|Barahona|Dajabon|Distrito Nacional|Duarte|El Seibo|Elias Pina|Espaillat|Hato Mayor|Independencia|La Altagracia|La Romana|La Vega|Maria Trinidad Sanchez|Monsenor Nouel|Monte Cristi|Monte Plata|Pedernales|Peravia|Puerto Plata|Salcedo|Samana|San Cristobal|San Juan|San Pedro de Macoris|Sanchez Ramirez|Santiago|Santiago Rodriguez|Valverde";
            s_a[65]="Azuay|Bolivar|Canar|Carchi|Chimborazo|Cotopaxi|El Oro|Esmeraldas|Galapagos|Guayas|Imbabura|Loja|Los Rios|Manabi|Morona-Santiago|Napo|Orellana|Pastaza|Pichincha|Sucumbios|Tungurahua|Zamora-Chinchipe";
            s_a[66]="Ad Daqahliyah|Al Bahr al Ahmar|Al Buhayrah|Al Fayyum|Al Gharbiyah|Al Iskandariyah|Al Isma'iliyah|Al Jizah|Al Minufiyah|Al Minya|Al Qahirah|Al Qalyubiyah|Al Wadi al Jadid|As Suways|Ash Sharqiyah|Aswan|Asyut|Bani Suwayf|Bur Sa'id|Dumyat|Janub Sina'|Kafr ash Shaykh|Matruh|Qina|Shamal Sina'|Suhaj";
            s_a[67]="Ahuachapan|Cabanas|Chalatenango|Cuscatlan|La Libertad|La Paz|La Union|Morazan|San Miguel|San Salvador|San Vicente|Santa Ana|Sonsonate|Usulutan";
            s_a[68]="Annobon|Bioko Norte|Bioko Sur|Centro Sur|Kie-Ntem|Litoral|Wele-Nzas";
            s_a[69]="Akale Guzay|Barka|Denkel|Hamasen|Sahil|Semhar|Senhit|Seraye";
            s_a[70]="Harjumaa (Tallinn)|Hiiumaa (Kardla)|Ida-Virumaa (Johvi)|Jarvamaa (Paide)|Jogevamaa (Jogeva)|Laane-Virumaa (Rakvere)|Laanemaa (Haapsalu)|Parnumaa (Parnu)|Polvamaa (Polva)|Raplamaa (Rapla)|Saaremaa (Kuessaare)|Tartumaa (Tartu)|Valgamaa (Valga)|Viljandimaa (Viljandi)|Vorumaa (Voru)"
            s_a[71]="Adis Abeba (Addis Ababa)|Afar|Amara|Dire Dawa|Gambela Hizboch|Hareri Hizb|Oromiya|Sumale|Tigray|YeDebub Biheroch Bihereseboch na Hizboch";
            s_a[72]="Europa Island";
            s_a[73]="Falkland Islands (Islas Malvinas)"
            s_a[74]="Bordoy|Eysturoy|Mykines|Sandoy|Skuvoy|Streymoy|Suduroy|Tvoroyri|Vagar";
            s_a[75]="Central|Eastern|Northern|Rotuma|Western";
            s_a[76]="Aland|Etela-Suomen Laani|Ita-Suomen Laani|Lansi-Suomen Laani|Lappi|Oulun Laani";
            s_a[77]="Alsace|Aquitaine|Auvergne|Basse-Normandie|Bourgogne|Bretagne|Centre|Champagne-Ardenne|Corse|Franche-Comte|Haute-Normandie|Ile-de-France|Languedoc-Roussillon|Limousin|Lorraine|Midi-Pyrenees|Nord-Pas-de-Calais|Pays de la Loire|Picardie|Poitou-Charentes|Provence-Alpes-Cote d'Azur|Rhone-Alpes";
            s_a[78]="French Guiana";
            s_a[79]="Archipel des Marquises|Archipel des Tuamotu|Archipel des Tubuai|Iles du Vent|Iles Sous-le-Vent";
            s_a[80]="Adelie Land|Ile Crozet|Iles Kerguelen|Iles Saint-Paul et Amsterdam";
            s_a[81]="Estuaire|Haut-Ogooue|Moyen-Ogooue|Ngounie|Nyanga|Ogooue-Ivindo|Ogooue-Lolo|Ogooue-Maritime|Woleu-Ntem";
            s_a[82]="Banjul|Central River|Lower River|North Bank|Upper River|Western";
            s_a[83]="Gaza Strip";
            s_a[84]="Abashis|Abkhazia or Ap'khazet'is Avtonomiuri Respublika (Sokhumi)|Adigenis|Ajaria or Acharis Avtonomiuri Respublika (Bat'umi)|Akhalgoris|Akhalk'alak'is|Akhalts'ikhis|Akhmetis|Ambrolauris|Aspindzis|Baghdat'is|Bolnisis|Borjomis|Ch'khorotsqus|Ch'okhatauris|Chiat'ura|Dedop'listsqaros|Dmanisis|Dushet'is|Gardabanis|Gori|Goris|Gurjaanis|Javis|K'arelis|K'ut'aisi|Kaspis|Kharagaulis|Khashuris|Khobis|Khonis|Lagodekhis|Lanch'khut'is|Lentekhis|Marneulis|Martvilis|Mestiis|Mts'khet'is|Ninotsmindis|Onis|Ozurget'is|P'ot'i|Qazbegis|Qvarlis|Rust'avi|Sach'kheris|Sagarejos|Samtrediis|Senakis|Sighnaghis|T'bilisi|T'elavis|T'erjolis|T'et'ritsqaros|T'ianet'is|Tqibuli|Ts'ageris|Tsalenjikhis|Tsalkis|Tsqaltubo|Vanis|Zestap'onis|Zugdidi|Zugdidis";
            s_a[85]="Baden-Wuerttemberg|Bayern|Berlin|Brandenburg|Bremen|Hamburg|Hessen|Mecklenburg-Vorpommern|Niedersachsen|Nordrhein-Westfalen|Rheinland-Pfalz|Saarland|Sachsen|Sachsen-Anhalt|Schleswig-Holstein|Thueringen";
            s_a[86]="Ashanti|Brong-Ahafo|Central|Eastern|Greater Accra|Northern|Upper East|Upper West|Volta|Western";
            s_a[87]="Gibraltar";
            s_a[88]="Ile du Lys|Ile Glorieuse";
            s_a[89]="Aitolia kai Akarnania|Akhaia|Argolis|Arkadhia|Arta|Attiki|Ayion Oros (Mt. Athos)|Dhodhekanisos|Drama|Evritania|Evros|Evvoia|Florina|Fokis|Fthiotis|Grevena|Ilia|Imathia|Ioannina|Irakleion|Kardhitsa|Kastoria|Kavala|Kefallinia|Kerkyra|Khalkidhiki|Khania|Khios|Kikladhes|Kilkis|Korinthia|Kozani|Lakonia|Larisa|Lasithi|Lesvos|Levkas|Magnisia|Messinia|Pella|Pieria|Preveza|Rethimni|Rodhopi|Samos|Serrai|Thesprotia|Thessaloniki|Trikala|Voiotia|Xanthi|Zakinthos";
            s_a[90]="Avannaa (Nordgronland)|Kitaa (Vestgronland)|Tunu (Ostgronland)"
            s_a[91]="Carriacou and Petit Martinique|Saint Andrew|Saint David|Saint George|Saint John|Saint Mark|Saint Patrick";
            s_a[92]="Basse-Terre|Grande-Terre|Iles de la Petite Terre|Iles des Saintes|Marie-Galante";
            s_a[93]="Guam";
            s_a[94]="Alta Verapaz|Baja Verapaz|Chimaltenango|Chiquimula|El Progreso|Escuintla|Guatemala|Huehuetenango|Izabal|Jalapa|Jutiapa|Peten|Quetzaltenango|Quiche|Retalhuleu|Sacatepequez|San Marcos|Santa Rosa|Solola|Suchitepequez|Totonicapan|Zacapa";
            s_a[95]="Castel|Forest|St. Andrew|St. Martin|St. Peter Port|St. Pierre du Bois|St. Sampson|St. Saviour|Torteval|Vale";
            s_a[96]="Beyla|Boffa|Boke|Conakry|Coyah|Dabola|Dalaba|Dinguiraye|Dubreka|Faranah|Forecariah|Fria|Gaoual|Gueckedou|Kankan|Kerouane|Kindia|Kissidougou|Koubia|Koundara|Kouroussa|Labe|Lelouma|Lola|Macenta|Mali|Mamou|Mandiana|Nzerekore|Pita|Siguiri|Telimele|Tougue|Yomou";
            s_a[97]="Bafata|Biombo|Bissau|Bolama-Bijagos|Cacheu|Gabu|Oio|Quinara|Tombali";
            s_a[98]="Barima-Waini|Cuyuni-Mazaruni|Demerara-Mahaica|East Berbice-Corentyne|Essequibo Islands-West Demerara|Mahaica-Berbice|Pomeroon-Supenaam|Potaro-Siparuni|Upper Demerara-Berbice|Upper Takutu-Upper Essequibo";
            s_a[99]="Artibonite|Centre|Grand'Anse|Nord|Nord-Est|Nord-Ouest|Ouest|Sud|Sud-Est";
            s_a[100]="Heard Island and McDonald Islands";
            s_a[101]="Holy See (Vatican City)"
            s_a[102]="Atlantida|Choluteca|Colon|Comayagua|Copan|Cortes|El Paraiso|Francisco Morazan|Gracias a Dios|Intibuca|Islas de la Bahia|La Paz|Lempira|Ocotepeque|Olancho|Santa Barbara|Valle|Yoro";
            s_a[103]="Hong Kong";
            s_a[104]="Howland Island";
            s_a[105]="Bacs-Kiskun|Baranya|Bekes|Bekescsaba|Borsod-Abauj-Zemplen|Budapest|Csongrad|Debrecen|Dunaujvaros|Eger|Fejer|Gyor|Gyor-Moson-Sopron|Hajdu-Bihar|Heves|Hodmezovasarhely|Jasz-Nagykun-Szolnok|Kaposvar|Kecskemet|Komarom-Esztergom|Miskolc|Nagykanizsa|Nograd|Nyiregyhaza|Pecs|Pest|Somogy|Sopron|Szabolcs-Szatmar-Bereg|Szeged|Szekesfehervar|Szolnok|Szombathely|Tatabanya|Tolna|Vas|Veszprem|Veszprem|Zala|Zalaegerszeg";
            s_a[106]="Akranes|Akureyri|Arnessysla|Austur-Bardhastrandarsysla|Austur-Hunavatnssysla|Austur-Skaftafellssysla|Borgarfjardharsysla|Dalasysla|Eyjafjardharsysla|Gullbringusysla|Hafnarfjordhur|Husavik|Isafjordhur|Keflavik|Kjosarsysla|Kopavogur|Myrasysla|Neskaupstadhur|Nordhur-Isafjardharsysla|Nordhur-Mulasys-la|Nordhur-Thingeyjarsysla|Olafsfjordhur|Rangarvallasysla|Reykjavik|Saudharkrokur|Seydhisfjordhur|Siglufjordhur|Skagafjardharsysla|Snaefellsnes-og Hnappadalssysla|Strandasysla|Sudhur-Mulasysla|Sudhur-Thingeyjarsysla|Vesttmannaeyjar|Vestur-Bardhastrandarsysla|Vestur-Hunavatnssysla|Vestur-Isafjardharsysla|Vestur-Skaftafellssysla";
            s_a[107]="Andaman and Nicobar Islands|Andhra Pradesh|Arunachal Pradesh|Assam|Bihar|Chandigarh|Chhattisgarh|Dadra and Nagar Haveli|Daman and Diu|Delhi|Goa|Gujarat|Haryana|Himachal Pradesh|Jammu and Kashmir|Jharkhand|Karnataka|Kerala|Lakshadweep|Madhya Pradesh|Maharashtra|Manipur|Meghalaya|Mizoram|Nagaland|Orissa|Pondicherry|Punjab|Rajasthan|Sikkim|Tamil Nadu|Tripura|Uttar Pradesh|Uttaranchal|West Bengal";
            s_a[108]="Aceh|Bali|Banten|Bengkulu|East Timor|Gorontalo|Irian Jaya|Jakarta Raya|Jambi|Jawa Barat|Jawa Tengah|Jawa Timur|Kalimantan Barat|Kalimantan Selatan|Kalimantan Tengah|Kalimantan Timur|Kepulauan Bangka Belitung|Lampung|Maluku|Maluku Utara|Nusa Tenggara Barat|Nusa Tenggara Timur|Riau|Sulawesi Selatan|Sulawesi Tengah|Sulawesi Tenggara|Sulawesi Utara|Sumatera Barat|Sumatera Selatan|Sumatera Utara|Yogyakarta";
            s_a[109]="Ardabil|Azarbayjan-e Gharbi|Azarbayjan-e Sharqi|Bushehr|Chahar Mahall va Bakhtiari|Esfahan|Fars|Gilan|Golestan|Hamadan|Hormozgan|Ilam|Kerman|Kermanshah|Khorasan|Khuzestan|Kohgiluyeh va Buyer Ahmad|Kordestan|Lorestan|Markazi|Mazandaran|Qazvin|Qom|Semnan|Sistan va Baluchestan|Tehran|Yazd|Zanjan";
            s_a[110]="Al Anbar|Al Basrah|Al Muthanna|Al Qadisiyah|An Najaf|Arbil|As Sulaymaniyah|At Ta'mim|Babil|Baghdad|Dahuk|Dhi Qar|Diyala|Karbala'|Maysan|Ninawa|Salah ad Din|Wasit";
            s_a[111]="Carlow|Cavan|Clare|Cork|Donegal|Dublin|Galway|Kerry|Kildare|Kilkenny|Laois|Leitrim|Limerick|Longford|Louth|Mayo|Meath|Monaghan|Offaly|Roscommon|Sligo|Tipperary|Waterford|Westmeath|Wexford|Wicklow";
            s_a[112]="Antrim|Ards|Armagh|Ballymena|Ballymoney|Banbridge|Belfast|Carrickfergus|Castlereagh|Coleraine|Cookstown|Craigavon|Derry|Down|Dungannon|Fermanagh|Larne|Limavady|Lisburn|Magherafelt|Moyle|Newry and Mourne|Newtownabbey|North Down|Omagh|Strabane";
            s_a[113]="Central|Haifa|Jerusalem|Northern|Southern|Tel Aviv";
            s_a[114]="Abruzzo|Basilicata|Calabria|Campania|Emilia-Romagna|Friuli-Venezia Giulia|Lazio|Liguria|Lombardia|Marche|Molise|Piemonte|Puglia|Sardegna|Sicilia|Toscana|Trentino-Alto Adige|Umbria|Valle d'Aosta|Veneto";
            s_a[115]="Clarendon|Hanover|Kingston|Manchester|Portland|Saint Andrew|Saint Ann|Saint Catherine|Saint Elizabeth|Saint James|Saint Mary|Saint Thomas|Trelawny|Westmoreland";
            s_a[116]="Jan Mayen";
            s_a[117]="Aichi|Akita|Aomori|Chiba|Ehime|Fukui|Fukuoka|Fukushima|Gifu|Gumma|Hiroshima|Hokkaido|Hyogo|Ibaraki|Ishikawa|Iwate|Kagawa|Kagoshima|Kanagawa|Kochi|Kumamoto|Kyoto|Mie|Miyagi|Miyazaki|Nagano|Nagasaki|Nara|Niigata|Oita|Okayama|Okinawa|Osaka|Saga|Saitama|Shiga|Shimane|Shizuoka|Tochigi|Tokushima|Tokyo|Tottori|Toyama|Wakayama|Yamagata|Yamaguchi|Yamanashi";
            s_a[118]="Jarvis Island";
            s_a[119]="Jersey";
            s_a[120]="Johnston Atoll";
            s_a[121]="'Amman|Ajlun|Al 'Aqabah|Al Balqa'|Al Karak|Al Mafraq|At Tafilah|Az Zarqa'|Irbid|Jarash|Ma'an|Madaba";
            s_a[122]="Juan de Nova Island";
            s_a[123]="Almaty|Aqmola|Aqtobe|Astana|Atyrau|Batys Qazaqstan|Bayqongyr|Mangghystau|Ongtustik Qazaqstan|Pavlodar|Qaraghandy|Qostanay|Qyzylorda|Shyghys Qazaqstan|Soltustik Qazaqstan|Zhambyl";
            s_a[124]="Central|Coast|Eastern|Nairobi Area|North Eastern|Nyanza|Rift Valley|Western";
            s_a[125]="Abaiang|Abemama|Aranuka|Arorae|Banaba|Banaba|Beru|Butaritari|Central Gilberts|Gilbert Islands|Kanton|Kiritimati|Kuria|Line Islands|Line Islands|Maiana|Makin|Marakei|Nikunau|Nonouti|Northern Gilberts|Onotoa|Phoenix Islands|Southern Gilberts|Tabiteuea|Tabuaeran|Tamana|Tarawa|Tarawa|Teraina";
            s_a[126]="Chagang-do (Chagang Province)|Hamgyong-bukto (North Hamgyong Province)|Hamgyong-namdo (South Hamgyong Province)|Hwanghae-bukto (North Hwanghae Province)|Hwanghae-namdo (South Hwanghae Province)|Kaesong-si (Kaesong City)|Kangwon-do (Kangwon Province)|Namp'o-si (Namp'o City)|P'yongan-bukto (North P'yongan Province)|P'yongan-namdo (South P'yongan Province)|P'yongyang-si (P'yongyang City)|Yanggang-do (Yanggang Province)"
            s_a[127]="Ch'ungch'ong-bukto|Ch'ungch'ong-namdo|Cheju-do|Cholla-bukto|Cholla-namdo|Inch'on-gwangyoksi|Kangwon-do|Kwangju-gwangyoksi|Kyonggi-do|Kyongsang-bukto|Kyongsang-namdo|Pusan-gwangyoksi|Soul-t'ukpyolsi|Taegu-gwangyoksi|Taejon-gwangyoksi|Ulsan-gwangyoksi";
            s_a[128]="Al 'Asimah|Al Ahmadi|Al Farwaniyah|Al Jahra'|Hawalli";
            s_a[129]="Batken Oblasty|Bishkek Shaary|Chuy Oblasty (Bishkek)|Jalal-Abad Oblasty|Naryn Oblasty|Osh Oblasty|Talas Oblasty|Ysyk-Kol Oblasty (Karakol)"
            s_a[130]="Attapu|Bokeo|Bolikhamxai|Champasak|Houaphan|Khammouan|Louangnamtha|Louangphabang|Oudomxai|Phongsali|Salavan|Savannakhet|Viangchan|Viangchan|Xaignabouli|Xaisomboun|Xekong|Xiangkhoang";
            s_a[131]="Aizkraukles Rajons|Aluksnes Rajons|Balvu Rajons|Bauskas Rajons|Cesu Rajons|Daugavpils|Daugavpils Rajons|Dobeles Rajons|Gulbenes Rajons|Jekabpils Rajons|Jelgava|Jelgavas Rajons|Jurmala|Kraslavas Rajons|Kuldigas Rajons|Leipaja|Liepajas Rajons|Limbazu Rajons|Ludzas Rajons|Madonas Rajons|Ogres Rajons|Preilu Rajons|Rezekne|Rezeknes Rajons|Riga|Rigas Rajons|Saldus Rajons|Talsu Rajons|Tukuma Rajons|Valkas Rajons|Valmieras Rajons|Ventspils|Ventspils Rajons";
            s_a[132]="Beyrouth|Ech Chimal|Ej Jnoub|El Bekaa|Jabal Loubnane";
            s_a[133]="Berea|Butha-Buthe|Leribe|Mafeteng|Maseru|Mohales Hoek|Mokhotlong|Qacha's Nek|Quthing|Thaba-Tseka";
            s_a[134]="Bomi|Bong|Grand Bassa|Grand Cape Mount|Grand Gedeh|Grand Kru|Lofa|Margibi|Maryland|Montserrado|Nimba|River Cess|Sinoe";
            s_a[135]="Ajdabiya|Al 'Aziziyah|Al Fatih|Al Jabal al Akhdar|Al Jufrah|Al Khums|Al Kufrah|An Nuqat al Khams|Ash Shati'|Awbari|Az Zawiyah|Banghazi|Darnah|Ghadamis|Gharyan|Misratah|Murzuq|Sabha|Sawfajjin|Surt|Tarabulus|Tarhunah|Tubruq|Yafran|Zlitan";
            s_a[136]="Balzers|Eschen|Gamprin|Mauren|Planken|Ruggell|Schaan|Schellenberg|Triesen|Triesenberg|Vaduz";
            s_a[137]="Akmenes Rajonas|Alytaus Rajonas|Alytus|Anyksciu Rajonas|Birstonas|Birzu Rajonas|Druskininkai|Ignalinos Rajonas|Jonavos Rajonas|Joniskio Rajonas|Jurbarko Rajonas|Kaisiadoriu Rajonas|Kaunas|Kauno Rajonas|Kedainiu Rajonas|Kelmes Rajonas|Klaipeda|Klaipedos Rajonas|Kretingos Rajonas|Kupiskio Rajonas|Lazdiju Rajonas|Marijampole|Marijampoles Rajonas|Mazeikiu Rajonas|Moletu Rajonas|Neringa Pakruojo Rajonas|Palanga|Panevezio Rajonas|Panevezys|Pasvalio Rajonas|Plunges Rajonas|Prienu Rajonas|Radviliskio Rajonas|Raseiniu Rajonas|Rokiskio Rajonas|Sakiu Rajonas|Salcininku Rajonas|Siauliai|Siauliu Rajonas|Silales Rajonas|Silutes Rajonas|Sirvintu Rajonas|Skuodo Rajonas|Svencioniu Rajonas|Taurages Rajonas|Telsiu Rajonas|Traku Rajonas|Ukmerges Rajonas|Utenos Rajonas|Varenos Rajonas|Vilkaviskio Rajonas|Vilniaus Rajonas|Vilnius|Zarasu Rajonas";
            s_a[138]="Diekirch|Grevenmacher|Luxembourg";
            s_a[139]="Macau";
            s_a[140]="Aracinovo|Bac|Belcista|Berovo|Bistrica|Bitola|Blatec|Bogdanci|Bogomila|Bogovinje|Bosilovo|Brvenica|Cair (Skopje)|Capari|Caska|Cegrane|Centar (Skopje)|Centar Zupa|Cesinovo|Cucer-Sandevo|Debar|Delcevo|Delogozdi|Demir Hisar|Demir Kapija|Dobrusevo|Dolna Banjica|Dolneni|Dorce Petrov (Skopje)|Drugovo|Dzepciste|Gazi Baba (Skopje)|Gevgelija|Gostivar|Gradsko|Ilinden|Izvor|Jegunovce|Kamenjane|Karbinci|Karpos (Skopje)|Kavadarci|Kicevo|Kisela Voda (Skopje)|Klecevce|Kocani|Konce|Kondovo|Konopiste|Kosel|Kratovo|Kriva Palanka|Krivogastani|Krusevo|Kuklis|Kukurecani|Kumanovo|Labunista|Lipkovo|Lozovo|Lukovo|Makedonska Kamenica|Makedonski Brod|Mavrovi Anovi|Meseista|Miravci|Mogila|Murtino|Negotino|Negotino-Poloska|Novaci|Novo Selo|Oblesevo|Ohrid|Orasac|Orizari|Oslomej|Pehcevo|Petrovec|Plasnia|Podares|Prilep|Probistip|Radovis|Rankovce|Resen|Rosoman|Rostusa|Samokov|Saraj|Sipkovica|Sopiste|Sopotnika|Srbinovo|Star Dojran|Staravina|Staro Nagoricane|Stip|Struga|Strumica|Studenicani|Suto Orizari (Skopje)|Sveti Nikole|Tearce|Tetovo|Topolcani|Valandovo|Vasilevo|Veles|Velesta|Vevcani|Vinica|Vitoliste|Vranestica|Vrapciste|Vratnica|Vrutok|Zajas|Zelenikovo|Zileno|Zitose|Zletovo|Zrnovci";
            s_a[141]="Antananarivo|Antsiranana|Fianarantsoa|Mahajanga|Toamasina|Toliara";
            s_a[142]="Balaka|Blantyre|Chikwawa|Chiradzulu|Chitipa|Dedza|Dowa|Karonga|Kasungu|Likoma|Lilongwe|Machinga (Kasupe)|Mangochi|Mchinji|Mulanje|Mwanza|Mzimba|Nkhata Bay|Nkhotakota|Nsanje|Ntcheu|Ntchisi|Phalombe|Rumphi|Salima|Thyolo|Zomba";
            s_a[143]="Johor|Kedah|Kelantan|Labuan|Melaka|Negeri Sembilan|Pahang|Perak|Perlis|Pulau Pinang|Sabah|Sarawak|Selangor|Terengganu|Wilayah Persekutuan";
            s_a[144]="Alifu|Baa|Dhaalu|Faafu|Gaafu Alifu|Gaafu Dhaalu|Gnaviyani|Haa Alifu|Haa Dhaalu|Kaafu|Laamu|Lhaviyani|Maale|Meemu|Noonu|Raa|Seenu|Shaviyani|Thaa|Vaavu";
            s_a[145]="Gao|Kayes|Kidal|Koulikoro|Mopti|Segou|Sikasso|Tombouctou";
            s_a[146]="Valletta";
            s_a[147]="Man, Isle of";
            s_a[148]="Ailinginae|Ailinglaplap|Ailuk|Arno|Aur|Bikar|Bikini|Bokak|Ebon|Enewetak|Erikub|Jabat|Jaluit|Jemo|Kili|Kwajalein|Lae|Lib|Likiep|Majuro|Maloelap|Mejit|Mili|Namorik|Namu|Rongelap|Rongrik|Toke|Ujae|Ujelang|Utirik|Wotho|Wotje";
            s_a[149]="Martinique";
            s_a[150]="Adrar|Assaba|Brakna|Dakhlet Nouadhibou|Gorgol|Guidimaka|Hodh Ech Chargui|Hodh El Gharbi|Inchiri|Nouakchott|Tagant|Tiris Zemmour|Trarza";
            s_a[151]="Agalega Islands|Black River|Cargados Carajos Shoals|Flacq|Grand Port|Moka|Pamplemousses|Plaines Wilhems|Port Louis|Riviere du Rempart|Rodrigues|Savanne";
            s_a[152]="Mayotte";
            s_a[153]="Aguascalientes|Baja California|Baja California Sur|Campeche|Chiapas|Chihuahua|Coahuila de Zaragoza|Colima|Distrito Federal|Durango|Guanajuato|Guerrero|Hidalgo|Jalisco|Mexico|Michoacan de Ocampo|Morelos|Nayarit|Nuevo Leon|Oaxaca|Puebla|Queretaro de Arteaga|Quintana Roo|San Luis Potosi|Sinaloa|Sonora|Tabasco|Tamaulipas|Tlaxcala|Veracruz-Llave|Yucatan|Zacatecas";
            s_a[154]="Chuuk (Truk)|Kosrae|Pohnpei|Yap";
            s_a[155]="Midway Islands";
            s_a[156]="Balti|Cahul|Chisinau|Chisinau|Dubasari|Edinet|Gagauzia|Lapusna|Orhei|Soroca|Tighina|Ungheni";
            s_a[157]="Fontvieille|La Condamine|Monaco-Ville|Monte-Carlo";
            s_a[158]="Arhangay|Bayan-Olgiy|Bayanhongor|Bulgan|Darhan|Dornod|Dornogovi|Dundgovi|Dzavhan|Erdenet|Govi-Altay|Hentiy|Hovd|Hovsgol|Omnogovi|Ovorhangay|Selenge|Suhbaatar|Tov|Ulaanbaatar|Uvs";
            s_a[159]="Saint Anthony|Saint Georges|Saint Peter's";
            s_a[160]="Agadir|Al Hoceima|Azilal|Ben Slimane|Beni Mellal|Boulemane|Casablanca|Chaouen|El Jadida|El Kelaa des Srarhna|Er Rachidia|Essaouira|Fes|Figuig|Guelmim|Ifrane|Kenitra|Khemisset|Khenifra|Khouribga|Laayoune|Larache|Marrakech|Meknes|Nador|Ouarzazate|Oujda|Rabat-Sale|Safi|Settat|Sidi Kacem|Tan-Tan|Tanger|Taounate|Taroudannt|Tata|Taza|Tetouan|Tiznit";
            s_a[161]="Cabo Delgado|Gaza|Inhambane|Manica|Maputo|Nampula|Niassa|Sofala|Tete|Zambezia";
            s_a[162]="Caprivi|Erongo|Hardap|Karas|Khomas|Kunene|Ohangwena|Okavango|Omaheke|Omusati|Oshana|Oshikoto|Otjozondjupa";
            s_a[163]="Aiwo|Anabar|Anetan|Anibare|Baiti|Boe|Buada|Denigomodu|Ewa|Ijuw|Meneng|Nibok|Uaboe|Yaren";
            s_a[164]="Bagmati|Bheri|Dhawalagiri|Gandaki|Janakpur|Karnali|Kosi|Lumbini|Mahakali|Mechi|Narayani|Rapti|Sagarmatha|Seti";
            s_a[165]="Drenthe|Flevoland|Friesland|Gelderland|Groningen|Limburg|Noord-Brabant|Noord-Holland|Overijssel|Utrecht|Zeeland|Zuid-Holland";
            s_a[166]="Netherlands Antilles";
            s_a[167]="Iles Loyaute|Nord|Sud";
            s_a[168]="Akaroa|Amuri|Ashburton|Bay of Islands|Bruce|Buller|Chatham Islands|Cheviot|Clifton|Clutha|Cook|Dannevirke|Egmont|Eketahuna|Ellesmere|Eltham|Eyre|Featherston|Franklin|Golden Bay|Great Barrier Island|Grey|Hauraki Plains|Hawera|Hawke's Bay|Heathcote|Hikurangi|Hobson|Hokianga|Horowhenua|Hurunui|Hutt|Inangahua|Inglewood|Kaikoura|Kairanga|Kiwitea|Lake|Mackenzie|Malvern|Manaia|Manawatu|Mangonui|Maniototo|Marlborough|Masterton|Matamata|Mount Herbert|Ohinemuri|Opotiki|Oroua|Otamatea|Otorohanga|Oxford|Pahiatua|Paparua|Patea|Piako|Pohangina|Raglan|Rangiora|Rangitikei|Rodney|Rotorua|Runanga|Saint Kilda|Silverpeaks|Southland|Stewart Island|Stratford|Strathallan|Taranaki|Taumarunui|Taupo|Tauranga|Thames-Coromandel|Tuapeka|Vincent|Waiapu|Waiheke|Waihemo|Waikato|Waikohu|Waimairi|Waimarino|Waimate|Waimate West|Waimea|Waipa|Waipawa|Waipukurau|Wairarapa South|Wairewa|Wairoa|Waitaki|Waitomo|Waitotara|Wallace|Wanganui|Waverley|Westland|Whakatane|Whangarei|Whangaroa|Woodville";
            s_a[169]="Atlantico Norte|Atlantico Sur|Boaco|Carazo|Chinandega|Chontales|Esteli|Granada|Jinotega|Leon|Madriz|Managua|Masaya|Matagalpa|Nueva Segovia|Rio San Juan|Rivas";
            s_a[170]="Agadez|Diffa|Dosso|Maradi|Niamey|Tahoua|Tillaberi|Zinder";
            s_a[171]="Abia|Abuja Federal Capital Territory|Adamawa|Akwa Ibom|Anambra|Bauchi|Bayelsa|Benue|Borno|Cross River|Delta|Ebonyi|Edo|Ekiti|Enugu|Gombe|Imo|Jigawa|Kaduna|Kano|Katsina|Kebbi|Kogi|Kwara|Lagos|Nassarawa|Niger|Ogun|Ondo|Osun|Oyo|Plateau|Rivers|Sokoto|Taraba|Yobe|Zamfara";
            s_a[172]="Niue";
            s_a[173]="Norfolk Island";
            s_a[174]="Northern Islands|Rota|Saipan|Tinian";
            s_a[175]="Akershus|Aust-Agder|Buskerud|Finnmark|Hedmark|Hordaland|More og Romsdal|Nord-Trondelag|Nordland|Oppland|Oslo|Ostfold|Rogaland|Sogn og Fjordane|Sor-Trondelag|Telemark|Troms|Vest-Agder|Vestfold";
            s_a[176]="Ad Dakhiliyah|Al Batinah|Al Wusta|Ash Sharqiyah|Az Zahirah|Masqat|Musandam|Zufar";
            s_a[177]="Balochistan|Federally Administered Tribal Areas|Islamabad Capital Territory|North-West Frontier Province|Punjab|Sindh";
            s_a[178]="Aimeliik|Airai|Angaur|Hatobohei|Kayangel|Koror|Melekeok|Ngaraard|Ngarchelong|Ngardmau|Ngatpang|Ngchesar|Ngeremlengui|Ngiwal|Palau Island|Peleliu|Sonsoral|Tobi";
            s_a[179]="Bocas del Toro|Chiriqui|Cocle|Colon|Darien|Herrera|Los Santos|Panama|San Blas|Veraguas";
            s_a[180]="Bougainville|Central|Chimbu|East New Britain|East Sepik|Eastern Highlands|Enga|Gulf|Madang|Manus|Milne Bay|Morobe|National Capital|New Ireland|Northern|Sandaun|Southern Highlands|West New Britain|Western|Western Highlands";
            s_a[181]="Alto Paraguay|Alto Parana|Amambay|Asuncion (city)|Boqueron|Caaguazu|Caazapa|Canindeyu|Central|Concepcion|Cordillera|Guaira|Itapua|Misiones|Neembucu|Paraguari|Presidente Hayes|San Pedro";
            s_a[182]="Amazonas|Ancash|Apurimac|Arequipa|Ayacucho|Cajamarca|Callao|Cusco|Huancavelica|Huanuco|Ica|Junin|La Libertad|Lambayeque|Lima|Loreto|Madre de Dios|Moquegua|Pasco|Piura|Puno|San Martin|Tacna|Tumbes|Ucayali";
            s_a[183]="Abra|Agusan del Norte|Agusan del Sur|Aklan|Albay|Angeles|Antique|Aurora|Bacolod|Bago|Baguio|Bais|Basilan|Basilan City|Bataan|Batanes|Batangas|Batangas City|Benguet|Bohol|Bukidnon|Bulacan|Butuan|Cabanatuan|Cadiz|Cagayan|Cagayan de Oro|Calbayog|Caloocan|Camarines Norte|Camarines Sur|Camiguin|Canlaon|Capiz|Catanduanes|Cavite|Cavite City|Cebu|Cebu City|Cotabato|Dagupan|Danao|Dapitan|Davao City Davao|Davao del Sur|Davao Oriental|Dipolog|Dumaguete|Eastern Samar|General Santos|Gingoog|Ifugao|Iligan|Ilocos Norte|Ilocos Sur|Iloilo|Iloilo City|Iriga|Isabela|Kalinga-Apayao|La Carlota|La Union|Laguna|Lanao del Norte|Lanao del Sur|Laoag|Lapu-Lapu|Legaspi|Leyte|Lipa|Lucena|Maguindanao|Mandaue|Manila|Marawi|Marinduque|Masbate|Mindoro Occidental|Mindoro Oriental|Misamis Occidental|Misamis Oriental|Mountain|Naga|Negros Occidental|Negros Oriental|North Cotabato|Northern Samar|Nueva Ecija|Nueva Vizcaya|Olongapo|Ormoc|Oroquieta|Ozamis|Pagadian|Palawan|Palayan|Pampanga|Pangasinan|Pasay|Puerto Princesa|Quezon|Quezon City|Quirino|Rizal|Romblon|Roxas|Samar|San Carlos (in Negros Occidental)|San Carlos (in Pangasinan)|San Jose|San Pablo|Silay|Siquijor|Sorsogon|South Cotabato|Southern Leyte|Sultan Kudarat|Sulu|Surigao|Surigao del Norte|Surigao del Sur|Tacloban|Tagaytay|Tagbilaran|Tangub|Tarlac|Tawitawi|Toledo|Trece Martires|Zambales|Zamboanga|Zamboanga del Norte|Zamboanga del Sur";
            s_a[184]="Pitcaim Islands";
            s_a[185]="Dolnoslaskie|Kujawsko-Pomorskie|Lodzkie|Lubelskie|Lubuskie|Malopolskie|Mazowieckie|Opolskie|Podkarpackie|Podlaskie|Pomorskie|Slaskie|Swietokrzyskie|Warminsko-Mazurskie|Wielkopolskie|Zachodniopomorskie";
            s_a[186]="Acores (Azores)|Aveiro|Beja|Braga|Braganca|Castelo Branco|Coimbra|Evora|Faro|Guarda|Leiria|Lisboa|Madeira|Portalegre|Porto|Santarem|Setubal|Viana do Castelo|Vila Real|Viseu";
            s_a[187]="Adjuntas|Aguada|Aguadilla|Aguas Buenas|Aibonito|Anasco|Arecibo|Arroyo|Barceloneta|Barranquitas|Bayamon|Cabo Rojo|Caguas|Camuy|Canovanas|Carolina|Catano|Cayey|Ceiba|Ciales|Cidra|Coamo|Comerio|Corozal|Culebra|Dorado|Fajardo|Florida|Guanica|Guayama|Guayanilla|Guaynabo|Gurabo|Hatillo|Hormigueros|Humacao|Isabela|Jayuya|Juana Diaz|Juncos|Lajas|Lares|Las Marias|Las Piedras|Loiza|Luquillo|Manati|Maricao|Maunabo|Mayaguez|Moca|Morovis|Naguabo|Naranjito|Orocovis|Patillas|Penuelas|Ponce|Quebradillas|Rincon|Rio Grande|Sabana Grande|Salinas|San German|San Juan|San Lorenzo|San Sebastian|Santa Isabel|Toa Alta|Toa Baja|Trujillo Alto|Utuado|Vega Alta|Vega Baja|Vieques|Villalba|Yabucoa|Yauco";
            s_a[188]="Ad Dawhah|Al Ghuwayriyah|Al Jumayliyah|Al Khawr|Al Wakrah|Ar Rayyan|Jarayan al Batinah|Madinat ash Shamal|Umm Salal";
            s_a[189]="Reunion";
            s_a[190]="Alba|Arad|Arges|Bacau|Bihor|Bistrita-Nasaud|Botosani|Braila|Brasov|Bucuresti|Buzau|Calarasi|Caras-Severin|Cluj|Constanta|Covasna|Dimbovita|Dolj|Galati|Giurgiu|Gorj|Harghita|Hunedoara|Ialomita|Iasi|Maramures|Mehedinti|Mures|Neamt|Olt|Prahova|Salaj|Satu Mare|Sibiu|Suceava|Teleorman|Timis|Tulcea|Vaslui|Vilcea|Vrancea";
            s_a[191]="Adygeya (Maykop)|Aginskiy Buryatskiy (Aginskoye)|Altay (Gorno-Altaysk)|Altayskiy (Barnaul)|Amurskaya (Blagoveshchensk)|Arkhangel'skaya|Astrakhanskaya|Bashkortostan (Ufa)|Belgorodskaya|Bryanskaya|Buryatiya (Ulan-Ude)|Chechnya (Groznyy)|Chelyabinskaya|Chitinskaya|Chukotskiy (Anadyr')|Chuvashiya (Cheboksary)|Dagestan (Makhachkala)|Evenkiyskiy (Tura)|Ingushetiya (Nazran')|Irkutskaya|Ivanovskaya|Kabardino-Balkariya (Nal'chik)|Kaliningradskaya|Kalmykiya (Elista)|Kaluzhskaya|Kamchatskaya (Petropavlovsk-Kamchatskiy)|Karachayevo-Cherkesiya (Cherkessk)|Kareliya (Petrozavodsk)|Kemerovskaya|Khabarovskiy|Khakasiya (Abakan)|Khanty-Mansiyskiy (Khanty-Mansiysk)|Kirovskaya|Komi (Syktyvkar)|Komi-Permyatskiy (Kudymkar)|Koryakskiy (Palana)|Kostromskaya|Krasnodarskiy|Krasnoyarskiy|Kurganskaya|Kurskaya|Leningradskaya|Lipetskaya|Magadanskaya|Mariy-El (Yoshkar-Ola)|Mordoviya (Saransk)|Moskovskaya|Moskva (Moscow)|Murmanskaya|Nenetskiy (Nar'yan-Mar)|Nizhegorodskaya|Novgorodskaya|Novosibirskaya|Omskaya|Orenburgskaya|Orlovskaya (Orel)|Penzenskaya|Permskaya|Primorskiy (Vladivostok)|Pskovskaya|Rostovskaya|Ryazanskaya|Sakha (Yakutsk)|Sakhalinskaya (Yuzhno-Sakhalinsk)|Samarskaya|Sankt-Peterburg (Saint Petersburg)|Saratovskaya|Severnaya Osetiya-Alaniya [North Ossetia] (Vladikavkaz)|Smolenskaya|Stavropol'skiy|Sverdlovskaya (Yekaterinburg)|Tambovskaya|Tatarstan (Kazan')|Taymyrskiy (Dudinka)|Tomskaya|Tul'skaya|Tverskaya|Tyumenskaya|Tyva (Kyzyl)|Udmurtiya (Izhevsk)|Ul'yanovskaya|Ust'-Ordynskiy Buryatskiy (Ust'-Ordynskiy)|Vladimirskaya|Volgogradskaya|Vologodskaya|Voronezhskaya|Yamalo-Nenetskiy (Salekhard)|Yaroslavskaya|Yevreyskaya";
            s_a[192]="Butare|Byumba|Cyangugu|Gikongoro|Gisenyi|Gitarama|Kibungo|Kibuye|Kigali Rurale|Kigali-ville|Ruhengeri|Umutara";
            s_a[193]="Ascension|Saint Helena|Tristan da Cunha";
            s_a[194]="Christ Church Nichola Town|Saint Anne Sandy Point|Saint George Basseterre|Saint George Gingerland|Saint James Windward|Saint John Capisterre|Saint John Figtree|Saint Mary Cayon|Saint Paul Capisterre|Saint Paul Charlestown|Saint Peter Basseterre|Saint Thomas Lowland|Saint Thomas Middle Island|Trinity Palmetto Point";
            s_a[195]="Anse-la-Raye|Castries|Choiseul|Dauphin|Dennery|Gros Islet|Laborie|Micoud|Praslin|Soufriere|Vieux Fort";
            s_a[196]="Miquelon|Saint Pierre";
            s_a[197]="Charlotte|Grenadines|Saint Andrew|Saint David|Saint George|Saint Patrick";
            s_a[198]="A'ana|Aiga-i-le-Tai|Atua|Fa'asaleleaga|Gaga'emauga|Gagaifomauga|Palauli|Satupa'itea|Tuamasaga|Va'a-o-Fonoti|Vaisigano";
            s_a[199]="Acquaviva|Borgo Maggiore|Chiesanuova|Domagnano|Faetano|Fiorentino|Monte Giardino|San Marino|Serravalle";
            s_a[200]="Principe|Sao Tome";
            s_a[201]="'Asir|Al Bahah|Al Hudud ash Shamaliyah|Al Jawf|Al Madinah|Al Qasim|Ar Riyad|Ash Sharqiyah (Eastern Province)|Ha'il|Jizan|Makkah|Najran|Tabuk";
            s_a[202]="Aberdeen City|Aberdeenshire|Angus|Argyll and Bute|City of Edinburgh|Clackmannanshire|Dumfries and Galloway|Dundee City|East Ayrshire|East Dunbartonshire|East Lothian|East Renfrewshire|Eilean Siar (Western Isles)|Falkirk|Fife|Glasgow City|Highland|Inverclyde|Midlothian|Moray|North Ayrshire|North Lanarkshire|Orkney Islands|Perth and Kinross|Renfrewshire|Shetland Islands|South Ayrshire|South Lanarkshire|Stirling|The Scottish Borders|West Dunbartonshire|West Lothian";
            s_a[203]="Dakar|Diourbel|Fatick|Kaolack|Kolda|Louga|Saint-Louis|Tambacounda|Thies|Ziguinchor";
            s_a[204]="Anse aux Pins|Anse Boileau|Anse Etoile|Anse Louis|Anse Royale|Baie Lazare|Baie Sainte Anne|Beau Vallon|Bel Air|Bel Ombre|Cascade|Glacis|Grand' Anse (on Mahe)|Grand' Anse (on Praslin)|La Digue|La Riviere Anglaise|Mont Buxton|Mont Fleuri|Plaisance|Pointe La Rue|Port Glaud|Saint Louis|Takamaka";
            s_a[205]="Eastern|Northern|Southern|Western";
            s_a[206]="Singapore";
            s_a[207]="Banskobystricky|Bratislavsky|Kosicky|Nitriansky|Presovsky|Trenciansky|Trnavsky|Zilinsky";
            s_a[208]="Ajdovscina|Beltinci|Bled|Bohinj|Borovnica|Bovec|Brda|Brezice|Brezovica|Cankova-Tisina|Celje|Cerklje na Gorenjskem|Cerknica|Cerkno|Crensovci|Crna na Koroskem|Crnomelj|Destrnik-Trnovska Vas|Divaca|Dobrepolje|Dobrova-Horjul-Polhov Gradec|Dol pri Ljubljani|Domzale|Dornava|Dravograd|Duplek|Gorenja Vas-Poljane|Gorisnica|Gornja Radgona|Gornji Grad|Gornji Petrovci|Grosuplje|Hodos Salovci|Hrastnik|Hrpelje-Kozina|Idrija|Ig|Ilirska Bistrica|Ivancna Gorica|Izola|Jesenice|Jursinci|Kamnik|Kanal|Kidricevo|Kobarid|Kobilje|Kocevje|Komen|Koper|Kozje|Kranj|Kranjska Gora|Krsko|Kungota|Kuzma|Lasko|Lenart|Lendava|Litija|Ljubljana|Ljubno|Ljutomer|Logatec|Loska Dolina|Loski Potok|Luce|Lukovica|Majsperk|Maribor|Medvode|Menges|Metlika|Mezica|Miren-Kostanjevica|Mislinja|Moravce|Moravske Toplice|Mozirje|Murska Sobota|Muta|Naklo|Nazarje|Nova Gorica|Novo Mesto|Odranci|Ormoz|Osilnica|Pesnica|Piran|Pivka|Podcetrtek|Podvelka-Ribnica|Postojna|Preddvor|Ptuj|Puconci|Race-Fram|Radece|Radenci|Radlje ob Dravi|Radovljica|Ravne-Prevalje|Ribnica|Rogasevci|Rogaska Slatina|Rogatec|Ruse|Semic|Sencur|Sentilj|Sentjernej|Sentjur pri Celju|Sevnica|Sezana|Skocjan|Skofja Loka|Skofljica|Slovenj Gradec|Slovenska Bistrica|Slovenske Konjice|Smarje pri Jelsah|Smartno ob Paki|Sostanj|Starse|Store|Sveti Jurij|Tolmin|Trbovlje|Trebnje|Trzic|Turnisce|Velenje|Velike Lasce|Videm|Vipava|Vitanje|Vodice|Vojnik|Vrhnika|Vuzenica|Zagorje ob Savi|Zalec|Zavrc|Zelezniki|Ziri|Zrece";
            s_a[209]="Bellona|Central|Choiseul (Lauru)|Guadalcanal|Honiara|Isabel|Makira|Malaita|Rennell|Temotu|Western";
            s_a[210]="Awdal|Bakool|Banaadir|Bari|Bay|Galguduud|Gedo|Hiiraan|Jubbada Dhexe|Jubbada Hoose|Mudug|Nugaal|Sanaag|Shabeellaha Dhexe|Shabeellaha Hoose|Sool|Togdheer|Woqooyi Galbeed";
            s_a[211]="Eastern Cape|Free State|Gauteng|KwaZulu-Natal|Mpumalanga|North-West|Northern Cape|Northern Province|Western Cape";
            s_a[212]="Bird Island|Bristol Island|Clerke Rocks|Montagu Island|Saunders Island|South Georgia|Southern Thule|Traversay Islands";
            s_a[213]="Andalucia|Aragon|Asturias|Baleares (Balearic Islands)|Canarias (Canary Islands)|Cantabria|Castilla y Leon|Castilla-La Mancha|Cataluna|Ceuta|Communidad Valencian|Extremadura|Galicia|Islas Chafarinas|La Rioja|Madrid|Melilla|Murcia|Navarra|Pais Vasco (Basque Country)|Penon de Alhucemas|Penon de Velez de la Gomera";
            s_a[214]="Spratly Islands";
            s_a[215]="Central|Eastern|North Central|North Eastern|North Western|Northern|Sabaragamuwa|Southern|Uva|Western";
            s_a[216]="A'ali an Nil|Al Bahr al Ahmar|Al Buhayrat|Al Jazirah|Al Khartum|Al Qadarif|Al Wahdah|An Nil al Abyad|An Nil al Azraq|Ash Shamaliyah|Bahr al Jabal|Gharb al Istiwa'iyah|Gharb Bahr al Ghazal|Gharb Darfur|Gharb Kurdufan|Janub Darfur|Janub Kurdufan|Junqali|Kassala|Nahr an Nil|Shamal Bahr al Ghazal|Shamal Darfur|Shamal Kurdufan|Sharq al Istiwa'iyah|Sinnar|Warab";
            s_a[217]="Brokopondo|Commewijne|Coronie|Marowijne|Nickerie|Para|Paramaribo|Saramacca|Sipaliwini|Wanica";
            s_a[218]="Barentsoya|Bjornoya|Edgeoya|Hopen|Kvitoya|Nordaustandet|Prins Karls Forland|Spitsbergen";
            s_a[219]="Hhohho|Lubombo|Manzini|Shiselweni";
            s_a[220]="Blekinge|Dalarnas|Gavleborgs|Gotlands|Hallands|Jamtlands|Jonkopings|Kalmar|Kronobergs|Norrbottens|Orebro|Ostergotlands|Skane|Sodermanlands|Stockholms|Uppsala|Varmlands|Vasterbottens|Vasternorrlands|Vastmanlands|Vastra Gotalands";
            s_a[221]="Aargau|Ausser-Rhoden|Basel-Landschaft|Basel-Stadt|Bern|Fribourg|Geneve|Glarus|Graubunden|Inner-Rhoden|Jura|Luzern|Neuchatel|Nidwalden|Obwalden|Sankt Gallen|Schaffhausen|Schwyz|Solothurn|Thurgau|Ticino|Uri|Valais|Vaud|Zug|Zurich";
            s_a[222]="Al Hasakah|Al Ladhiqiyah|Al Qunaytirah|Ar Raqqah|As Suwayda'|Dar'a|Dayr az Zawr|Dimashq|Halab|Hamah|Hims|Idlib|Rif Dimashq|Tartus";
            s_a[223]="Chang-hua|Chi-lung|Chia-i|Chia-i|Chung-hsing-hsin-ts'un|Hsin-chu|Hsin-chu|Hua-lien|I-lan|Kao-hsiung|Kao-hsiung|Miao-li|Nan-t'ou|P'eng-hu|P'ing-tung|T'ai-chung|T'ai-chung|T'ai-nan|T'ai-nan|T'ai-pei|T'ai-pei|T'ai-tung|T'ao-yuan|Yun-lin";
            s_a[224]="Viloyati Khatlon|Viloyati Leninobod|Viloyati Mukhtori Kuhistoni Badakhshon";
            s_a[225]="Arusha|Dar es Salaam|Dodoma|Iringa|Kagera|Kigoma|Kilimanjaro|Lindi|Mara|Mbeya|Morogoro|Mtwara|Mwanza|Pemba North|Pemba South|Pwani|Rukwa|Ruvuma|Shinyanga|Singida|Tabora|Tanga|Zanzibar Central/South|Zanzibar North|Zanzibar Urban/West";
            s_a[226]="Amnat Charoen|Ang Thong|Buriram|Chachoengsao|Chai Nat|Chaiyaphum|Chanthaburi|Chiang Mai|Chiang Rai|Chon Buri|Chumphon|Kalasin|Kamphaeng Phet|Kanchanaburi|Khon Kaen|Krabi|Krung Thep Mahanakhon (Bangkok)|Lampang|Lamphun|Loei|Lop Buri|Mae Hong Son|Maha Sarakham|Mukdahan|Nakhon Nayok|Nakhon Pathom|Nakhon Phanom|Nakhon Ratchasima|Nakhon Sawan|Nakhon Si Thammarat|Nan|Narathiwat|Nong Bua Lamphu|Nong Khai|Nonthaburi|Pathum Thani|Pattani|Phangnga|Phatthalung|Phayao|Phetchabun|Phetchaburi|Phichit|Phitsanulok|Phra Nakhon Si Ayutthaya|Phrae|Phuket|Prachin Buri|Prachuap Khiri Khan|Ranong|Ratchaburi|Rayong|Roi Et|Sa Kaeo|Sakon Nakhon|Samut Prakan|Samut Sakhon|Samut Songkhram|Sara Buri|Satun|Sing Buri|Sisaket|Songkhla|Sukhothai|Suphan Buri|Surat Thani|Surin|Tak|Trang|Trat|Ubon Ratchathani|Udon Thani|Uthai Thani|Uttaradit|Yala|Yasothon";
            s_a[227]="Tobago";
            s_a[228]="De La Kara|Des Plateaux|Des Savanes|Du Centre|Maritime";
            s_a[229]="Atafu|Fakaofo|Nukunonu";
            s_a[230]="Ha'apai|Tongatapu|Vava'u";
            s_a[231]="Arima|Caroni|Mayaro|Nariva|Port-of-Spain|Saint Andrew|Saint David|Saint George|Saint Patrick|San Fernando|Victoria";
            s_a[232]="Ariana|Beja|Ben Arous|Bizerte|El Kef|Gabes|Gafsa|Jendouba|Kairouan|Kasserine|Kebili|Mahdia|Medenine|Monastir|Nabeul|Sfax|Sidi Bou Zid|Siliana|Sousse|Tataouine|Tozeur|Tunis|Zaghouan";
            s_a[233]="Adana|Adiyaman|Afyon|Agri|Aksaray|Amasya|Ankara|Antalya|Ardahan|Artvin|Aydin|Balikesir|Bartin|Batman|Bayburt|Bilecik|Bingol|Bitlis|Bolu|Burdur|Bursa|Canakkale|Cankiri|Corum|Denizli|Diyarbakir|Duzce|Edirne|Elazig|Erzincan|Erzurum|Eskisehir|Gaziantep|Giresun|Gumushane|Hakkari|Hatay|Icel|Igdir|Isparta|Istanbul|Izmir|Kahramanmaras|Karabuk|Karaman|Kars|Kastamonu|Kayseri|Kilis|Kirikkale|Kirklareli|Kirsehir|Kocaeli|Konya|Kutahya|Malatya|Manisa|Mardin|Mugla|Mus|Nevsehir|Nigde|Ordu|Osmaniye|Rize|Sakarya|Samsun|Sanliurfa|Siirt|Sinop|Sirnak|Sivas|Tekirdag|Tokat|Trabzon|Tunceli|Usak|Van|Yalova|Yozgat|Zonguldak";
            s_a[234]="Ahal Welayaty|Balkan Welayaty|Dashhowuz Welayaty|Lebap Welayaty|Mary Welayaty";
            s_a[235]="Tuvalu";
            s_a[236]="Adjumani|Apac|Arua|Bugiri|Bundibugyo|Bushenyi|Busia|Gulu|Hoima|Iganga|Jinja|Kabale|Kabarole|Kalangala|Kampala|Kamuli|Kapchorwa|Kasese|Katakwi|Kibale|Kiboga|Kisoro|Kitgum|Kotido|Kumi|Lira|Luwero|Masaka|Masindi|Mbale|Mbarara|Moroto|Moyo|Mpigi|Mubende|Mukono|Nakasongola|Nebbi|Ntungamo|Pallisa|Rakai|Rukungiri|Sembabule|Soroti|Tororo";
            s_a[237]="Avtonomna Respublika Krym (Simferopol')|Cherkas'ka (Cherkasy)|Chernihivs'ka (Chernihiv)|Chernivets'ka (Chernivtsi)|Dnipropetrovs'ka (Dnipropetrovs'k)|Donets'ka (Donets'k)|Ivano-Frankivs'ka (Ivano-Frankivs'k)|Kharkivs'ka (Kharkiv)|Khersons'ka (Kherson)|Khmel'nyts'ka (Khmel'nyts'kyy)|Kirovohrads'ka (Kirovohrad)|Kyyiv|Kyyivs'ka (Kiev)|L'vivs'ka (L'viv)|Luhans'ka (Luhans'k)|Mykolayivs'ka (Mykolayiv)|Odes'ka (Odesa)|Poltavs'ka (Poltava)|Rivnens'ka (Rivne)|Sevastopol'|Sums'ka (Sumy)|Ternopil's'ka (Ternopil')|Vinnyts'ka (Vinnytsya)|Volyns'ka (Luts'k)|Zakarpats'ka (Uzhhorod)|Zaporiz'ka (Zaporizhzhya)|Zhytomyrs'ka (Zhytomyr)"
            s_a[238]="'Ajman|Abu Zaby (Abu Dhabi)|Al Fujayrah|Ash Shariqah (Sharjah)|Dubayy (Dubai)|Ra's al Khaymah|Umm al Qaywayn";
            s_a[239]="Artigas|Canelones|Cerro Largo|Colonia|Durazno|Flores|Florida|Lavalleja|Maldonado|Montevideo|Paysandu|Rio Negro|Rivera|Rocha|Salto|San Jose|Soriano|Tacuarembo|Treinta y Tres";
            s_a[240]="Andijon Wiloyati|Bukhoro Wiloyati|Farghona Wiloyati|Jizzakh Wiloyati|Khorazm Wiloyati (Urganch)|Namangan Wiloyati|Nawoiy Wiloyati|Qashqadaryo Wiloyati (Qarshi)|Qoraqalpoghiston (Nukus)|Samarqand Wiloyati|Sirdaryo Wiloyati (Guliston)|Surkhondaryo Wiloyati (Termiz)|Toshkent Shahri|Toshkent Wiloyati";
            s_a[241]="Malampa|Penama|Sanma|Shefa|Tafea|Torba";
            s_a[242]="Amazonas|Anzoategui|Apure|Aragua|Barinas|Bolivar|Carabobo|Cojedes|Delta Amacuro|Dependencias Federales|Distrito Federal|Falcon|Guarico|Lara|Merida|Miranda|Monagas|Nueva Esparta|Portuguesa|Sucre|Tachira|Trujillo|Vargas|Yaracuy|Zulia";
            s_a[243]="An Giang|Ba Ria-Vung Tau|Bac Giang|Bac Kan|Bac Lieu|Bac Ninh|Ben Tre|Binh Dinh|Binh Duong|Binh Phuoc|Binh Thuan|Ca Mau|Can Tho|Cao Bang|Da Nang|Dac Lak|Dong Nai|Dong Thap|Gia Lai|Ha Giang|Ha Nam|Ha Noi|Ha Tay|Ha Tinh|Hai Duong|Hai Phong|Ho Chi Minh|Hoa Binh|Hung Yen|Khanh Hoa|Kien Giang|Kon Tum|Lai Chau|Lam Dong|Lang Son|Lao Cai|Long An|Nam Dinh|Nghe An|Ninh Binh|Ninh Thuan|Phu Tho|Phu Yen|Quang Binh|Quang Nam|Quang Ngai|Quang Ninh|Quang Tri|Soc Trang|Son La|Tay Ninh|Thai Binh|Thai Nguyen|Thanh Hoa|Thua Thien-Hue|Tien Giang|Tra Vinh|Tuyen Quang|Vinh Long|Vinh Phuc|Yen Bai";
            s_a[244]="Saint Croix|Saint John|Saint Thomas";
            s_a[245]="Blaenau Gwent|Bridgend|Caerphilly|Cardiff|Carmarthenshire|Ceredigion|Conwy|Denbighshire|Flintshire|Gwynedd|Isle of Anglesey|Merthyr Tydfil|Monmouthshire|Neath Port Talbot|Newport|Pembrokeshire|Powys|Rhondda Cynon Taff|Swansea|The Vale of Glamorgan|Torfaen|Wrexham";
            s_a[246]="Alo|Sigave|Wallis";
            s_a[247]="West Bank";
            s_a[248]="Western Sahara";
            s_a[249]="'Adan|'Ataq|Abyan|Al Bayda'|Al Hudaydah|Al Jawf|Al Mahrah|Al Mahwit|Dhamar|Hadhramawt|Hajjah|Ibb|Lahij|Ma'rib|Sa'dah|San'a'|Ta'izz";
            s_a[250]="Kosovo|Montenegro|Serbia|Vojvodina";
            s_a[251]="Central|Copperbelt|Eastern|Luapula|Lusaka|North-Western|Northern|Southern|Western";
            s_a[252]="Bulawayo|Harare|ManicalandMashonaland Central|Mashonaland East|Mashonaland West|Masvingo|Matabeleland North|Matabeleland South|Midlands";
            
            var states = s_a[GetCountryList().indexOf(country) + 1]
            return states.split("|")
        }

        // User Password Reset
        function PasswordReset(password) {
            return $resource(_URLS.BASE_API + 'user/password_reset' + _URLS.TOKEN_API + $localStorage.token, {
                c_password      : password.current_password,
                n_password      : password.new_password
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }

        // Child Password Reset
        function ChildPasswordReset(password, child_id) {
            console.log('Child id is :'+child_id);
            console.log('Current password is :'+password.current_password);
            console.log('New password is :'+password.new_password);

            return $resource(_URLS.BASE_API + 'user/child_password_reset' + _URLS.TOKEN_API + $localStorage.token, {
                childid         : child_id,
                c_password      : password.current_password,
                n_password      : password.new_password
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }
        
        // Add - Remove Points
        function AddRewards(reward) {
            return $resource(_URLS.BASE_API + 'reward' + _URLS.TOKEN_API + $localStorage.token, {
                child_id	: reward.child_id,
    		    value	    : reward.value,
                type		: reward.type,          // 1: quizzes, 2: tasks, 3: behavior
                attempt_id	: reward.attempt_id,    // if type == 1 or 2 
                enable		: 1
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
            
        }
        
        // Get Today behavior
        function GetRewardsByChild(childId) {
            return $resource(_URLS.BASE_API + 'reward/by_child/' + childId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Get  behavior points
        function GetBehaviorPoints(childId) {
            return $resource(_URLS.BASE_API + 'reward/behavior_analysis/' + childId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Change Profile Image
        function ChangeProfileImage(image, id, makeProgress) {
            return $q(function(resolve, reject) {
                Upload.upload({
                    url: _URLS.BASE_API + 'upload/profile/' + id + _URLS.TOKEN_API + $localStorage.token,
                    data: {
                        image: image
                    }
                }).then(function(resp) {
                    resolve(resp);
                }, function(resp) {
                    reject(resp);
                }, function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    makeProgress(progressPercentage);
                })
            });
        }
        
        // Get summary of user by id
        function GetUserSummary(id) {
            return $resource(_URLS.BASE_API + 'reward/child_data/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Get certificates by user id
        function GetCertificateByUser(userId) {
            return $resource(_URLS.BASE_API + 'certificate/by_child/' + userId + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Get child chore points
        function GetChildChorepoints(id) {
            return $resource(_URLS.BASE_API + 'reward/chore_analysis/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Get child Lesson points
        function GetChildLessonpoints(id) {
            return $resource(_URLS.BASE_API + 'reward/lesson_analysis/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Get Certificate html
        function GetCertificateHtml(data) {
            var date = $filter('date')(new Date(data.issue_date), "MMMM dd, yyyy");
            var a = '<div style="width:842px; height:595px; padding:20px; text-align:center; border: 10px solid #200A10; background: rgb(255,237,186);">' +
                    '<div style="width:792px; height:545px; padding:20px; text-align:center; border: 5px solid #200A10">' +
                        '<span style="font-size:50px; font-weight:bold">Certificate of Completion</span>' +
                        '<br><br><br><br><br>' +
                        '<span style="font-size:30px"><b>' + data.f_name + ' ' + data.l_name + '</b></span><br/><br/>' +
                        '<span style="font-size:25px"><i>has mastered the topic of</i></span> <br/><br/><br/><br/>' +
                        '<span style="font-size:30px">' + data.name + '</span> <br/><br/><br/><br/>' +
                        '<span style="font-size:25px"><i>on Earn2Learn.com <br> on</i></span><br><br>'+
                        '<span style="font-size:27px">' + date + '</span><br>'+
                        // '<img width="250" height="200" src="' + _URLS.BASE_FOLDER + '/includes/images/badge.png">'+
                '</div>' +
                '</div>';
            return a;
        }


         // Get Badge html
        function GetBadgeHtml(data) {
            var date = $filter('date')(new Date(data.issue_date), "MMMM dd, yyyy");
            var a = '<div style="width:842px; height:595px; padding:20px; text-align:center; border: 10px solid #200A10; background: rgb(255,237,186);">' +
                    '<div style="width:792px; height:545px; padding:20px; text-align:center; border: 5px solid #200A10">' +
                        '<span style="font-size:50px; font-weight:bold">Badge of Completion</span>' +
                        '<br><br>' +
                        '<img src="uploads/badges/'+data.badge_image+'"/><br/><br/>'+
                        '<br><br>' +
                        '<span style="font-size:30px"><b>' + data.f_name + ' ' + data.l_name + '</b></span><br/><br/>' +
                        '<span style="font-size:25px"><i>has mastered the topic of</i></span> <br/><br/><br/><br/>' +
                        '<span style="font-size:30px">' + data.name + '</span> <br/><br/><br/><br/>' +
                        '<span style="font-size:25px"><i>on Earn2Learn.com <br> on</i></span><br><br>'+
                        // '<img width="250" height="200" src="' + _URLS.BASE_FOLDER + '/includes/images/badge.png">'+
                '</div>' +
                '</div>';
            return a;
        }

        // Load Recommended Lessons
        function LoadRecommendedLessons() {
            return $resource(_URLS.BASE_API + 'lesson/recommended' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        // Get Certificate Image Url 
        function GetCertificateImageUrl(id, html) {
            return $resource(_URLS.BASE_API + 'certificate/certificate_image' + _URLS.TOKEN_API + $localStorage.token, {
                id	    : id,
    		    content	: html
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }


        // Get Badge Image Url
        function GetBadgeImageUrl(id, html) {
            return $resource(_URLS.BASE_API + 'badge/badgeImage' + _URLS.TOKEN_API + $localStorage.token, {
                id	    : id,
    		    content	: html
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }
        
        // Connect FB
        function ConnectFb(fb) {
            console.log("fb", fb);
            return $resource(_URLS.BASE_API + 'user/fb_connect' + _URLS.TOKEN_API + $localStorage.token, {
                email	: fb.email,
    		    f_name	: fb.first_name,
                l_name	: fb.last_name,    
                id	    : fb.id
            }, {
                fetch: 'JSONP',
                'query': {
                    method: 'POST',
                    isArray: false
                }
            }).query().$promise;
        }
        
        // Disconnect Disconnect Fb
        function DisconnectFb() {
            return $resource(_URLS.BASE_API + 'user/fb_disconnect' + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }

        //Check the Subscription Period of the user
        function subscriptionPeriod(id) {
            return $resource(_URLS.BASE_API + 'user_subscription/' + id + _URLS.TOKEN_API + $localStorage.token).get().$promise;
        }
        
        
        
        return {
            getAllUsers: GetAllUsers,
            GetRecentlyAddedParents: GetRecentlyAddedParents,
            getUserById : GetUserById,
            getUsersByHouseId : GetUsersByHouseId,
            getUsersMessages : GetUsersMessages,
            loadRecentActivities : LoadRecentActivities,
            getUsersByUserRole : GetUsersByUserRole,
            getUserByName : GetUserByName,
            createUser : CreateUser,
            updateUser : UpdateUser,
            deleteUser : DeleteUser,
            softDeleteUser : SoftDeleteUser,
            softDeleteChildUser : SoftDeleteChildUser,
            getCountryList : GetCountryList,
            populateStates : PopulateStates,
            passwordReset : PasswordReset,
            childPasswordReset : ChildPasswordReset,
            addRewards  : AddRewards,
            getRewardsByChild : GetRewardsByChild,
            getBehaviorPoints : GetBehaviorPoints,
            changeProfileImage : ChangeProfileImage,
            getUserSummary : GetUserSummary,
            getCertificateByUser : GetCertificateByUser,
            getCertificateHtml : GetCertificateHtml,
            getChildChorepoints : GetChildChorepoints,
            getChildLessonpoints : GetChildLessonpoints,
            loadRecommendedLessons : LoadRecommendedLessons,
            getCertificateImageUrl : GetCertificateImageUrl,
            connectFb : ConnectFb,
            disconnectFb : DisconnectFb,
            getAllSponsoredChildren : GetAllSponsoredChildren,
            checkIsSponsor : CheckIsSponsor,
            getSponsorAccessibleHouseDetails : GetSponsorAccessibleHouseDetails,
            subscriptionPeriod:subscriptionPeriod,
            getBadgeHtml:GetBadgeHtml,
            getBadgeImageUrl:GetBadgeImageUrl,
        };
    }]);
})();