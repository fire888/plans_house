const BLUE = "#333399"
const RED = "#AA0011"
const GREEN = "#117711"
const YELLOW = "#776611"
export const BLACK = "#22223F"
export const WHITE = "#ffffff";
const SIZE = [500, 120]
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

    'path_l024': ['path026'],

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
}


export const LABELS_DATA = {
    'label000': { text: 'ВХОД', size: SIZE, color: BLACK, pathLabel: 'path_l000' },
    'label012': { text: 'лаб. 101', size: SIZE, color: BLUE, pathLabel: 'path_l012' },
    'label013': { text: 'лаб. 102', size: SIZE, color: BLUE, pathLabel: 'path_l013' },
    'label014': { text: 'лаб. 103', size: SIZE, color: BLUE, pathLabel: 'path_l014' },
    'label015': { text: 'лаб. 104', size: SIZE, color: BLUE, pathLabel: 'path_l015' },
    'label016': { text: 'лаб. 105', size: SIZE, color: BLUE, pathLabel: 'path_l016' },
    'label017': { text: 'гардероб', size: SIZE, color: BLACK, pathLabel: 'path_g'},
    'label018': { text: 'лаб. 106', size: SIZE, color: RED, pathLabel: 'path_l018' },
    'label019': { text: 'лаб. 107', size: SIZE, color: RED, pathLabel: 'path_l019' },
    'label020': { text: 'лаб. 108', size: SIZE, color: RED, pathLabel: 'path_l020' },
    'label021': { text: 'лаб. 109', size: SIZE, color: RED, pathLabel: 'path_l021' },
    'label022': { text: 'лаб. 110', size: SIZE, color: RED, pathLabel: 'path_l022' },
    'label023': { text: 'лаб. 111', size: SIZE, color: RED, pathLabel: 'path_l023' },
    'label024': { text: 'лестница', size: SIZE, color: BLACK, pathLabel: 'path_l024' },
    'label025': { text: 'лифт', size: SIZE, color: BLACK, pathLabel: 'path_l025' },
    'label026': { text: 'лаб. 112', size: SIZE, color: GREEN, pathLabel: 'path_l026' },
    'label027': { text: 'ВХОД 2', size: SIZE, color: BLACK, pathLabel: 'path_l027'},
}


export const RED_GROUP = [
    'floor01_item08',  
    'floor01_item09',
    'floor01_item10',
    'floor01_item11',
    'floor01_item12',
    'floor01_item13',
]
export const BLUE_GROUP = [
    'floor01_item103',
    'floor01_item03',
    'floor01_item07',
    'floor01_item06',
    'floor01_item05',
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
