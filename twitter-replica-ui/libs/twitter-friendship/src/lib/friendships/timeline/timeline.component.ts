import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FanOutService, TweetTimelineModel } from 'libs/twitter-core/src';

@Component({
  selector: 'twitter-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit, OnDestroy {
  constructor(private readonly fanOutService: FanOutService) {}
  timeline: TweetTimelineModel[] = [];

  // Subscriptions
  followingUsersSubs: Subscription;

  ngOnInit() {
    this.followingUsersSubs = this.fanOutService
      .getTimelineListener()
      .subscribe((tweets: TweetTimelineModel[]) => {
        this.timeline = tweets;
      });
    this.fanOutService.getTimeline();
  }

  ngOnDestroy() {
    this.followingUsersSubs.unsubscribe();
  }
}
