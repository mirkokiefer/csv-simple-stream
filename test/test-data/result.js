var obj = {}

obj.rawResult = [
  ['id', 'name', 'date'],
  ['20322051544', 'AB', '2000-01-01'],
  ['28392898392,comma', 'CD', '2050-03-27'],
  ['double "quotes', 'EF', '2028-11-21'],
  ['single \'quotes', 'HI', '2094-10-13'],
  ['29488439438', 'JK', '2018-01-19'],
  ['29387209003', 'LM', '2038-03-20'],
  ['92723900302', 'NO', '2010-04-17'],
  ['10928374031', 'PQ', '2009-08-18'],
  ['93827894382', 'RS', '2042-02-03'],
  ['09183910389', 'TU', '2039-12-30'],
  ['01938723092', 'VX', '2094-04-04'],
  ['13892830219', 'YZ', '2071-07-18'],
  ['20322051544', 'AB', '2000-01-01'],
  ['28392898392', 'CD', '2050-03-27'],
  ['83928938291', 'EF', '2028-11-21'],
  ['59843549873', 'HI', '2094-10-13'],
  ['29488439438', 'JK', '2018-01-19'],
  ['29387209003', 'LM', '2038-03-20'],
  ['92723900302', 'NO', '2010-04-17'],
  ['10928374031', 'PQ', '2009-08-18'],
  ['93827894382', 'RS', '2042-02-03'],
  ['09183910389', 'TU', '2039-12-30'],
  ['01938723092', 'VX', '2094-04-04'],
  ['13892830219', 'YZ', '2071-07-18'],
  ['20322051544', 'AB', '2000-01-01'],
  ['28392898392', 'CD', '2050-03-27'],
  ['83928938291', 'EF', '2028-11-21'],
  ['59843549873', 'HI', '2094-10-13'],
  ['29488439438', 'JK', '2018-01-19'],
  ['29387209003', 'LM', '2038-03-20'],
  ['92723900302', 'NO', '2010-04-17'],
  ['10928374031', 'PQ', '2009-08-18'],
  ['93827894382', 'RS', '2042-02-03'],
  ['09183910389', 'TU', '2039-12-30'],
  ['01938723092', 'VX', '2094-04-04'],
  ['13892830219', 'YZ', '2071-07-18'],
  ['20322051544', 'AB', '2000-01-01'],
  ['28392898392', 'CD', '2050-03-27'],
  ['83928938291', 'EF', '2028-11-21'],
  ['59843549873', 'HI', '2094-10-13'],
  ['29488439438', 'JK', '2018-01-19'],
  ['29387209003', 'LM', '2038-03-20'],
  ['92723900302', 'NO', '2010-04-17'],
  ['10928374031', 'PQ', '2009-08-18'],
  ['93827894382', 'RS', '2042-02-03'],
  ['09183910389', 'TU', '2039-12-30'],
  ['01938723092', 'VX', '2094-04-04'],
  ['13892830219', 'YZ', '2071-07-18'],
  ['20322051544', 'AB', '2000-01-01'],
  ['28392898392', 'CD', '2050-03-27'],
  ['83928938291', 'EF', '2028-11-21'],
  ['59843549873', 'HI', '2094-10-13'],
  ['29488439438', 'JK', '2018-01-19'],
  ['29387209003', 'LM', '2038-03-20'],
  ['92723900302', 'NO', '2010-04-17'],
  ['10928374031', 'PQ', '2009-08-18'],
  ['93827894382', 'RS', '2042-02-03'],
  ['09183910389', 'TU', '2039-12-30'],
  ['01938723092', 'VX', '2094-04-04'],
  ['13892830219', 'YZ', '2071-07-18'],
  ['20322051544', 'AB', '2000-01-01'],
  ['28392898392', 'CD', '2050-03-27'],
  ['83928938291', 'EF', '2028-11-21'],
  ['59843549873', 'HI', '2094-10-13'],
  ['29488439438', 'JK', '2018-01-19'],
  ['29387209003', 'LM', '2038-03-20'],
  ['92723900302', 'NO', '2010-04-17'],
  ['10928374031', 'PQ', '2009-08-18'],
  ['93827894382', 'RS', '2042-02-03'],
  ['09183910389', 'TU', '2039-12-30'],
  ['01938723092', 'VX', '2094-04-04'],
  ['13892830219', 'YZ', '2071-07-18'],
  ['20322051544', 'AB', '2000-01-01'],
  ['28392898392', 'CD', '2050-03-27'],
  ['83928938291', 'EF', '2028-11-21'],
  ['59843549873', 'HI', '2094-10-13'],
  ['29488439438', 'JK', '2018-01-19'],
  ['29387209003', 'LM', '2038-03-20'],
  ['92723900302', 'NO', '2010-04-17'],
  ['10928374031', 'PQ', '2009-08-18'],
  ['93827894382', 'RS', '2042-02-03'],
  ['09183910389', 'TU', '2039-12-30'],
  ['01938723092', 'VX', '2094-04-04'],
  ['13892830219', 'YZ', '2071-07-18'],
  ['20322051544', 'AB', '2000-01-01'],
  ['28392898392', 'CD', '2050-03-27'],
  ['83928938291', 'EF', '2028-11-21'],
  ['59843549873', 'HI', '2094-10-13'],
  ['29488439438', 'JK', '2018-01-19'],
  ['29387209003', 'LM', '2038-03-20'],
  ['92723900302', 'NO', '2010-04-17'],
  ['10928374031', 'PQ', '2009-08-18'],
  ['93827894382', 'RS', '2042-02-03'],
  ['09183910389', 'TU', '2039-12-30'],
  ['01938723092', 'VX', '2094-04-04'],
  ['13892830219', 'YZ', '2071-07-18'],
  ['20322051544', 'AB', '2000-01-01'],
  ['28392898392', 'CD', '2050-03-27'],
  ['83928938291', 'EF', '2028-11-21'],
  ['59843549873', 'HI', '2094-10-13'],
  ['29488439438', 'JK', '2018-01-19'],
  ['29387209003', 'LM', '2038-03-20'],
  ['92723900302', 'NO', '2010-04-17'],
  ['10928374031', 'PQ', '2009-08-18'],
  ['93827894382', 'RS', '2042-02-03'],
  ['09183910389', 'TU', '2039-12-30'],
  ['01938723092', 'VX', '2094-04-04'],
  ['13892830219', 'YZ', '2071-07-18'],
  ['20322051544', 'AB', '2000-01-01'],
  ['28392898392', 'CD', '2050-03-27'],
  ['83928938291', 'EF', '2028-11-21'],
  ['59843549873', 'HI', '2094-10-13'],
  ['29488439438', 'JK', '2018-01-19'],
  ['29387209003', 'LM', '2038-03-20'],
  ['92723900302', 'NO', '2010-04-17'],
  ['10928374031', 'PQ', '2009-08-18'],
  ['93827894382', 'RS', '2042-02-03'],
  ['09183910389', 'TU', '2039-12-30'],
  ['01938723092', 'VX', '2094-04-04'],
  ['13892830219', 'YZ', '2071-07-18'],
  ['20322051544', 'AB', '2000-01-01'],
  ['28392898392', 'CD', '2050-03-27'],
  ['83928938291', 'EF', '2028-11-21'],
  ['59843549873', 'HI', '2094-10-13'],
  ['29488439438', 'JK', '2018-01-19'],
  ['29387209003', 'LM', '2038-03-20'],
  ['92723900302', 'NO', '2010-04-17'],
  ['10928374031', 'PQ', '2009-08-18'],
  ['93827894382', 'RS', '2042-02-03'],
  ['09183910389', 'TU', '2039-12-30'],
  ['01938723092', 'VX', '2094-04-04'],
  ['13892830219', 'YZ', '2071-07-18'],
  ['20322051544', 'AB', '2000-01-01'],
  ['28392898392', 'CD', '2050-03-27'],
  ['83928938291', 'EF', '2028-11-21'],
  ['59843549873', 'HI', '2094-10-13'],
  ['29488439438', 'JK', '2018-01-19'],
  ['29387209003', 'LM', '2038-03-20'],
  ['92723900302', 'NO', '2010-04-17'],
  ['10928374031', 'PQ', '2009-08-18'],
  ['93827894382', 'RS', '2042-02-03'],
  ['09183910389', 'TU', '2039-12-30'],
  ['01938723092', 'VX', '2094-04-04'],
  ['13892830219', 'YZ', '2071-07-18'],
  ['20322051544', 'AB', '2000-01-01'],
  ['28392898392', 'CD', '2050-03-27'],
  ['83928938291', 'EF', '2028-11-21'],
  ['59843549873', 'HI', '2094-10-13'],
  ['29488439438', 'JK', '2018-01-19'],
  ['29387209003', 'LM', '2038-03-20'],
  ['92723900302', 'NO', '2010-04-17'],
  ['10928374031', 'PQ', '2009-08-18'],
  ['93827894382', 'RS', '2042-02-03'],
  ['09183910389', 'TU', '2039-12-30'],
  ['01938723092', 'VX', '2094-04-04'],
  ['13892830219', 'YZ', '2071-07-18']
]

module.exports = obj