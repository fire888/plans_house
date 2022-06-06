const BLUE = "#333399"
const RED = "#AA0011"
const GREEN = "#117711"
const YELLOW = "#776611"
export const BLACK = "#22223F"
export const WHITE = "#ffffff";
const SIZE = [220, 120]
const SIZE2 = [450, 120]
export const LABEL_OFFSET_Y = .2



export const CROSS_DATA = {
    /** left right */
    'path01': ['path002', 'path_l012'],
    'path002': ['path_l013', 'path01', 'path003'],
    'path003': ['path002', 'path_l014', 'path004'],
    'path004': ['path003', 'path_l015', 'path005'],
    'path005': ['path004', 'path_l016', 'path020'],
    'path020': ['path005', 'path021', 'path006'],
    'path006': ['path007', 'path020', 'path027', 'path013'],
    'path007': ['path006', 'path_l018', 'path008',],
    'path008': ['path007', 'path_l019', 'path009',],
    'path009': ['path008', 'path_l020', 'path010',],
    'path010': ['path009', 'path_l021', 'path011',],
    'path011': ['path010', 'path_l022', 'path012',],
    'path012': ['path011', 'path_l023',],

    'path_l012': ['path01'],
    'path_l013': ['path002'],
    'path_l014': ['path003'],
    'path_l015': ['path004'],
    'path_l016': ['path005'],
    'path_l018': ['path007'],
    'path_l019': ['path008'],
    'path_l020': ['path009'],
    'path_l021': ['path010'],
    'path_l022': ['path011'],
    'path_l023': ['path012'],


    /** enter */
    'path013': ['path006', 'path014',],
    'path014': ['path013', 'path015',],
    'path015': ['path014', 'path016',],
    'path016': ['path015', 'path017', 'path_g'],
    'path017': ['path016', 'path018'],
    'path018': ['path017', 'path036'],
    'path036': ['path018', 'path_l000'],

    'path_g': ['path016'],
    'path_l000': ['path036'],



    /** stair */
    'path021' : ['path020', 'path022'],
    'path022' : ['path021', 'path023'],
    'path023' : ['path022', 'path024'],
    'path024' : ['path023', 'path025'],
    'path025' : ['path024', 'path026'],
    'path026' : ['path025', 'path_l024'],



    /** back */
    'path027': ['path006', 'path028', 'path029'],
    'path028': ['path027', 'path_l025'],
    'path029': ['path027', 'path030'],
    'path030': ['path029', 'path_l026', 'path031'],
    'path031': ['path030', 'path032'],
    'path032': ['path031', 'path033'],
    'path033': ['path032', 'path034'],
    'path034': ['path033', 'path035'],
    'path035': ['path034', 'path_l027'],

    'path_l025': ['path028'],
    'path_l026': ['path030'],
    'path_l027': ['path035'],



    /** SECOND_FLOOR */
    'path_l024': ['path026', 'path100', 'path107'],
    'path100': ['path_l024', 'path101'],
    'path101': ['path100', 'path_l100', 'path102'],
    'path102': ['path101', 'path_l103', 'path104'],
    'path104': ['path102', 'path_l105', 'path105'],
    'path105': ['path_l106', 'path104', 'path103'],
    'path103': ['path_l104', 'path105'],

    /** stairs */
    'path107': ['path024', 'path108'],
    'path108': ['path107', 'path109'],
    'path109': ['path108', 'path110'],
    'path110': ['path109', 'path111'],
    'path111': ['path110', 'path112'],


    'path_l105': ['path104'],
    'path_l103': ['path102'],
    'path_l100': ['path101'],
    'path_l106': ['path105'],
    'path_l104': ['path103'],



    /** THIRD FLOOR */
    'path112': ['path111', 'path_l113', 'path113'],
    'path113': ['path_l114', 'path112', 'path114'],
    'path114': ['path_l115', 'path113', 'path115'],
    'path115': ['path_l116', 'path114', 'path116'],
    'path116': ['path115', 'path_l117'],

    'path_l113': ['path112'],
    'path_l114': ['path113'],
    'path_l115': ['path114'],
    'path_l116': ['path115'],
    'path_l117': ['path116']
}


export const LABELS_DATA = {
    'label000': { text: 'ВХОД', size: SIZE2, color: BLACK, pathLabel: 'path_l000' },
    'label027': { text: 'ВХОД 2', size: SIZE2, color: BLACK, pathLabel: 'path_l027'},
    'label012': { text: '101', size: SIZE, color: BLUE, pathLabel: 'path_l012' },
    'label013': { text: '102', size: SIZE, color: BLUE, pathLabel: 'path_l013' },
    'label014': { text: '103', size: SIZE, color: BLUE, pathLabel: 'path_l014' },
    'label015': { text: '104', size: SIZE, color: BLUE, pathLabel: 'path_l015' },
    'label016': { text: '105', size: SIZE, color: BLUE, pathLabel: 'path_l016' },
    'label017': { text: 'гардероб', size: SIZE2, color: BLACK, pathLabel: 'path_g'},
    'label018': { text: '106', size: SIZE, color: RED, pathLabel: 'path_l018' },
    'label019': { text: '107', size: SIZE, color: RED, pathLabel: 'path_l019' },
    'label020': { text: '108', size: SIZE, color: RED, pathLabel: 'path_l020' },
    'label021': { text: '109', size: SIZE, color: RED, pathLabel: 'path_l021' },
    'label022': { text: '110', size: SIZE, color: RED, pathLabel: 'path_l022' },
    'label023': { text: '111', size: SIZE, color: RED, pathLabel: 'path_l023' },
    'label026': { text: '112', size: SIZE, color: GREEN, pathLabel: 'path_l026' },
    'label024': { text: 'лестница', size: SIZE2, color: BLACK, pathLabel: 'path_l024' },
    'label025': { text: 'лифт', size: SIZE2, color: BLACK, pathLabel: 'path_l025' },
    'label100': { text: '200', size: SIZE, color: BLUE, pathLabel: 'path_l100'},
    'label101': { text: '201', size: SIZE, color: BLUE, pathLabel: 'path_l103'},
    'label102': { text: '202', size: SIZE, color: BLUE, pathLabel: 'path_l105'},
    'label103': { text: '203', size: SIZE, color: BLUE, pathLabel: 'path_l106'},
    'label104': { text: '204', size: SIZE, color: BLUE, pathLabel: 'path_l104'},
    'label209': { text: '300', size: SIZE, color: BLUE, pathLabel: 'path_l113'},
    'label208': { text: '301', size: SIZE, color: BLUE, pathLabel: 'path_l114' },
    'label207': { text: '302', size: SIZE, color: BLUE, pathLabel: 'path_l115'},
    'label206': { text: '303', size: SIZE, color: BLUE, pathLabel: 'path_l116' },
    'label205': { text: '304', size: SIZE, color: BLUE, pathLabel: 'path_l117'},
}

export const START_CLICKS_TO_PATH = [
    { dir: 'start', label: 'label000', },
    { dir: 'end', label: 'label205' },
]


export const RED_GROUP = [
    'floor01_item08',  
    'floor01_item09',
    'floor01_item10',
    'floor01_item11',
    'floor01_item12',
    'floor01_item13',

    'floor02_item109',
    'floor02_item110',
    'floor02_item111',
    'floor02_item112',
    'floor02_item113',
    'floor02_item114',

    'floor03_item125',
    'floor03_item124',
    'floor03_item123',
    'floor03_item122',
    'floor03_item121',
    'floor03_item120',
]
export const BLUE_GROUP = [
    'floor01_item103',
    'floor01_item03',
    'floor01_item07',
    'floor01_item06',
    'floor01_item05',
    'floor02_item104',
    'floor02_item105',
    'floor02_item106',
    'floor02_item107',
    'floor02_item108',
    'floor03_item115',
    'floor03_item116',
    'floor03_item117',
    'floor03_item118',
    'floor03_item119'
]
export const GREEN_GROUP = [
    'floor01_item15',
    'floor01_item16',
    'floor01_item17',
    'floor01_item18',
    'floor01_item19',
    'floor01_item20',
    'floor01_item21',
    'floor01_item22',
    'floor01_item23',
    'floor01_item24',
    'floor01_item25',
    'floor01_item26',
]
