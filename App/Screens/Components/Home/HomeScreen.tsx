import React, { useCallback, useEffect, useMemo, useState } from 'react';
import SimpleToast from 'react-native-simple-toast';
import LightTheme from '@Theme/LightTheme';
import CustomSlider from '@CommonComponent/CustomSlider';
import AppImages from '@Theme/AppImages';
import ThemeColor from '@Theme/Colors';
import { Layout } from '@CommonComponent/Layout';
import { StyleSheet, View } from 'react-native';
import { CustomText } from '@CommonComponent/CustomText';
import { INVESTED_TIMELINE, fonts, width } from '@Utils/Constant';
import { en } from '@Localization/index';
import { BadgeBox } from '@SubComponents/BadgeBox';
import { TimeLineContainer } from '@CommonComponent/TimeLineContainer';
import { ButtonComponent } from '@SubComponents/AppButton';
import { CategoryTitle } from '@SubComponents/CategoryTitle';
import { formatNumber, getInvestMentCount, getWidth } from '@Utils/Helper';
import { InvestedAmountContainer } from '@CommonComponent/InvestedAmountContainer';
import { DropDownSheet } from '@SubComponents/DropDownSheet';
import {
  getAllProductPools,
  getDetails,
  setCalculatorPools,
} from '@Services/ProductService';
import { PoolsList, poolDropDown } from '@Utils/Interface';

const styles = StyleSheet.create({
  btnStyle: {
    marginTop: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  tradeContainerStyle: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
  },
  rowGap: {
    rowGap: 19,
    marginTop: 10,
  },
  yearContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  yearBoxStyle: {
    paddingHorizontal: 30,
  },
  rowCatStyle: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
  },
  dropContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  widthStyle: {
    width: '50%',
  },
});

const HomeScreen = () => {
  const {
    btnStyle,
    btnContainer,
    tradeContainerStyle,
    rowGap,
    yearContainer,
    yearBoxStyle,
    rowCatStyle,
    dropContainer,
    widthStyle,
  } = styles;

  const [value, setValue] = useState(2000);
  const [selectedTimeline, setSelectedTimeLine] = useState('Weekly');
  const [selectedYear, setSelectedYear] = useState(3);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [isSelectedPool, setIsSelectedPoolId] = useState('');
  const [poolsList, setPoolsList] = useState<poolDropDown[]>([]);
  const [resultData, setResultData] = useState<any>({});
  const [isNegativeReturn, setIsNegativeReturn] = useState(false);

  const getPercentage = useMemo(() => {
    let percentage = `0.0%`;
    if (resultData?.returnAmount) {
      if (resultData?.returnAmount < 0) {
        setIsNegativeReturn(true);
      } else {
        setIsNegativeReturn(false);
      }

      return `${resultData?.returnAmount} %`;
    }
    return percentage;
  }, [resultData]);

  const getInUSD = useMemo(() => {
    let getMoney = '0 USDC';
    if (resultData?.investedAmount?.investedAmountInUSD) {
      let worthNowInUSD = +resultData?.investedAmount?.worthNowInUSD;
      getMoney = `${formatNumber(worthNowInUSD, 2)} USDC`;
    }
    return getMoney;
  }, [resultData]);

  const getInvestedAmount = useMemo(() => {
    let getMoney = '0 USDC';
    if (resultData?.investedAmount?.investedAmount) {
      getMoney = `${formatNumber(
        resultData?.investedAmount?.investedAmount,
        2,
      )} USDC`;
    }
    return getMoney;
  }, [resultData]);

  useEffect(() => {
    getProductPools();
  }, []);

  const changeTimeLine = useCallback((e: string) => {
    setSelectedTimeLine(e);
  }, []);

  const updateSlider = useCallback((e: number) => {
    setValue(e);
  }, []);

  const getProductPools = async () => {
    try {
      const res = await getAllProductPools();
      if (res.success) {
        let data: PoolsList[] = [...res.data.pools];
        const getCount = await res.data.pools.map(async (item: PoolsList) => {
          return getDetails(item.id);
        });
        const result = await Promise.all(getCount);
        const newDta: poolDropDown[] = [];
        data.map((item: PoolsList, index: number) => {
          const newDataItem = {
            value: item.id.toString(),
            label: item.poolName,
            img: item.poolImage,
            count: result[index].data,
          };
          newDta.push(newDataItem);
        });
        setPoolsList(newDta);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const isValidation = () => {
    let isValid = true;
    if (!isSelectedPool) {
      isValid = false;
      SimpleToast.show('Please select Invested In');
    } else if (value <= 0) {
      isValid = false;
      SimpleToast.show('Please select Invested Amount');
    }
    return isValid;
  };

  const onCalculate = async () => {
    if (!isValidation()) {
      return;
    }
    if (selectedYear > poolsList[0].count.yearlyOptions) {
      return;
    }
    try {
      setIsProcessing(true);
      let poolData = poolsList[0].count;
      let newInvestMentCount = 0;
      Object?.keys(poolData).find((item, index) => {
        if (item.includes(selectedTimeline.toLowerCase())) {
          newInvestMentCount = index;
        }
      });
      const frqDay = INVESTED_TIMELINE[newInvestMentCount].value;

      const params = {
        poolId: +isSelectedPool,
        frqInDays: frqDay,
        investmentCount: getInvestMentCount(selectedYear, newInvestMentCount),
        sipAmount: value.toString(),
      };
      const res = await setCalculatorPools(params);
      if (res.success) {
        let newData = {
          returnAmount: res?.data?.result.absoluteReturns,
          investedAmount:
            res?.data?.result.resultData[
              res?.data.result?.resultData?.length - 1
            ],
        };
        setResultData(newData);
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Layout scrollable padding={15} bounces={false}>
      <CustomText
        xxlarge
        style={[fonts.Bold, { textAlign: 'center', color: LightTheme.text }]}>
        {en.CALCULATE_EARNINGS}
      </CustomText>
      <InvestedAmountContainer value={value} setValue={updateSlider} />
      <CustomSlider
        min={0}
        low={value}
        max={21000}
        disableRange={true}
        width={width * 0.9}
        containerStyle={{ marginTop: 10 }}
        onChange={(low: any, high: any) => setValue(low)}
      />
      <View style={dropContainer}>
        <CategoryTitle title={en.INVESTED_IN} />
        <DropDownSheet
          dataList={poolsList}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          placeholder={'Select Type'}
          value={isSelectedPool}
          onSelectedChangeText={item => {
            setIsSelectedPoolId(item.value);
          }}
          isFocus={isFocus}
          dropContainerStyle={{ width: 200 }}
        />
      </View>

      <View style={[rowGap]}>
        <CategoryTitle title={en.INVESTED_TIMELINE} />
        <TimeLineContainer
          selectedTimeline={selectedTimeline}
          setSelectedTimeLine={changeTimeLine}
        />
      </View>
      <View style={yearContainer}>
        <View>
          <CategoryTitle title={en.INVESTED_FROM} />
          {(selectedYear > poolsList[0]?.count.yearlyOptions && (
            <CustomText style={[fonts.Regular, { color: LightTheme.red }]}>
              {en.YEAR_ERROR}
            </CustomText>
          )) ||
            null}
        </View>
        <BadgeBox
          title={`${selectedYear} year`}
          textStyle={{ color: LightTheme.text }}
          containerStyle={yearBoxStyle}
        />
      </View>
      <CustomSlider
        min={1}
        mode="year"
        low={selectedYear}
        max={10}
        disableRange={true}
        width={width * 0.9}
        containerStyle={{ marginTop: 10 }}
        onChange={(low: any, high: any) => setSelectedYear(low)}
      />
      <View style={rowCatStyle}>
        <CategoryTitle title={en.INVESTED_MONEY} textStyle={widthStyle} />
        <CustomText xlarge style={[fonts.Bold, { color: ThemeColor.primary }]}>
          {getInvestedAmount}
        </CustomText>
      </View>
      <View style={rowCatStyle}>
        <CategoryTitle title={en.MONEY_YOU_WOULD_HAVE} textStyle={widthStyle} />
        <View>
          <CustomText xxlarge style={[fonts.Bold, { color: LightTheme.green }]}>
            {getInUSD}
          </CustomText>
          <BadgeBox
            title={getPercentage}
            rightImg={AppImages.icUpTrade}
            rightImgStyle={{
              tintColor:
                (isNegativeReturn && LightTheme.red) || LightTheme.green,
              transform: [{ rotate: (isNegativeReturn && '180deg') || '0deg' }],
            }}
            containerStyle={[
              tradeContainerStyle,
              {
                backgroundColor:
                  (isNegativeReturn && LightTheme.LightRed) ||
                  LightTheme.LightGreen,
              },
            ]}
            textStyle={[
              fonts.Bold,
              {
                color: (isNegativeReturn && LightTheme.red) || LightTheme.green,
              },
            ]}
          />
        </View>
      </View>
      <View style={btnContainer}>
        <ButtonComponent
          title={en.CALCULATE}
          isProcessing={isProcessing}
          onPress={onCalculate}
          style={[btnStyle, { backgroundColor: LightTheme.secondary }]}
        />
      </View>
    </Layout>
  );
};

export { HomeScreen };
