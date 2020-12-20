import React, { useCallback, useLayoutEffect } from 'react';
import BarChart from 'react-native-chart-kit/src/BarChart';

import { Widget, WidgetTitle } from '../components/Widget';
import {
  Container,
  SizedBox,
  SmallText,
  CenteredBlock,
} from '../components/Helpers';
import { formatDate, getScreenWidth, getWeeklyDates } from '../utils';
import { COLORS } from '../constants';
import { Button } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { habitSlice } from '../store/habits/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { habitSelector } from '../store/habits/selector';
import { RootState } from '../store/reducer';
import { repeatsSlice } from '../store/repeats/reducer';
import { getCurrentUserSelector } from '../store/users/selector';
import { getHabitRepeats } from '../store/repeats/selector';
import { useTheme } from '../hooks';
import { useTranslation } from 'react-i18next';

// TODO type
export const HabitScreen = ({ route, navigation }: any) => {
  const fromDate = new Date(route.params.fromDate);
  const theme = useTheme();

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const habit = useSelector((state: RootState) =>
    habitSelector(state, route.params.habit.id),
  )!;

  const currentUser = useSelector(getCurrentUserSelector);

  const repeats = useSelector((state: RootState) =>
    getHabitRepeats(state, habit.id!),
  );

  const todaysRepeats = repeats.find(
    (repeat) => repeat.date === formatDate(fromDate),
  );

  const done = todaysRepeats ? todaysRepeats.repeats : 0;

  const dates = getWeeklyDates().map((date) => formatDate(date));
  const barChartData = dates.map((date) => {
    const repeat = repeats.find((item) => item.date === date);
    if (repeat) {
      return repeat.repeats;
    }

    return 0;
  });

  const completePercent = (done / habit.total) * 100;
  const isCompleted = completePercent >= 100;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: habit.name,
    });
  }, [route, repeats]);

  const onAddRepeat = useCallback(() => {
    dispatch(
      repeatsSlice.actions.addRepeat({
        habitId: habit.id!,
        countRepeats: 1,
        date: fromDate,
        userId: currentUser!.uid,
      }),
    );
  }, [route]);

  const removeHabit = useCallback(() => {
    dispatch(habitSlice.actions.removeHabit(habit.id!));
    navigation.goBack();
  }, []);

  const data = {
    labels: [
      t('mo').toUpperCase(),
      t('tu').toUpperCase(),
      t('we').toUpperCase(),
      t('th').toUpperCase(),
      t('fr').toUpperCase(),
      t('sa').toUpperCase(),
      t('su').toUpperCase(),
    ],
    datasets: [
      {
        data: barChartData,
        color: () => 'rgba(134, 65, 244, 1)',
      },
    ],
  };

  const chartConfig = {
    backgroundColor: 'transparent',
    backgroundGradientFrom: theme.colors.card,
    backgroundGradientTo: theme.colors.card,
    fillShadowGradientOpacity: 0.5,
    barPercentage: 0.7,
    decimalPlaces: 0,
    barRadius: 12,
    strokeWidth: 0,
    fillShadowGradient: COLORS.mainColor,
    color: () => theme.colors.text,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <ScrollView>
      <Container>
        <Widget>
          <WidgetTitle>{t('habit.dailyProgress.title')}</WidgetTitle>
          <SizedBox height={32} />
          <CenteredBlock>
            <AnimatedCircularProgress
              fill={completePercent}
              tintColor={COLORS.mainColor}
              backgroundColor={COLORS.shadowColor}
              size={96}
              width={6}>
              {() => (
                <SmallText numberOfLines={1}>
                  {completePercent.toFixed(0)}%
                </SmallText>
              )}
            </AnimatedCircularProgress>
            <SizedBox height={16} />
            {!isCompleted && (
              <Button mode={'contained'} onPress={onAddRepeat}>
                {t('buttons.repeatHabit')}
              </Button>
            )}
          </CenteredBlock>
        </Widget>
        <SizedBox height={16} />
        <Widget>
          <WidgetTitle>{t('habit.weeklyProgress.title')}</WidgetTitle>
          <SizedBox height={32} />
          <BarChart
            data={data}
            fromZero={true}
            withInnerLines={false}
            width={getScreenWidth - 64}
            height={220}
            showBarTops={false}
            yAxisLabel=""
            yAxisSuffix={''}
            chartConfig={chartConfig}
          />
        </Widget>
        <SizedBox height={16} />
        <Button mode={'text'} color={COLORS.red} onPress={removeHabit}>
          {t('buttons.deleteHabit')}
        </Button>
      </Container>
    </ScrollView>
  );
};
